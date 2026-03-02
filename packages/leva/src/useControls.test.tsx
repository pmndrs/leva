/**
 * Integration tests for useControls with store lifecycle
 */

import React, { useEffect } from 'react'
import { describe, it, expect, vi, afterEach } from 'vitest'
import { render, act } from '@testing-library/react'
import { useControls } from './useControls'
import { levaStore } from './store'
import { LevaPanel } from './components/Leva'

// Mock stitches to avoid CSS-in-JS insertRule errors in jsdom.
// @stitches/react is imported transitively via useControls -> components/Leva -> stitches.config.ts.
// The mock is scoped to this file and doesn't affect production code.
// NOTE: vi.mock is hoisted by Vitest's transformer at build time, so this runs before imports regardless of position.
vi.mock('@stitches/react', () => ({
  createStitches: () => ({
    styled: () => () => null,
    css: () => () => '',
    globalCss: () => () => {},
    keyframes: () => '',
    getCssText: () => '',
    theme: {},
    createTheme: () => ({}),
    config: {},
  }),
}))

afterEach(() => {
  levaStore.dispose()
  levaStore.setNoCache(false)
})

function NumberComponent({ id }: { id?: string }) {
  const { myNumber } = useControls({ myNumber: 5 }, { headless: true })
  return <div data-testid={id ?? 'value'}>{myNumber}</div>
}

function NestedNumberComponent({ id }: { id?: string }) {
  const { myNumber } = useControls('myFolder', { myNumber: 5 }, { store: levaStore, headless: true })
  return <div data-testid={id ?? 'value'}>{myNumber}</div>
}

function NumberComponentNoCache({ id }: { id?: string }) {
  const { myNumber } = useControls({ myNumber: 5 }, { headless: true })
  useEffect(
    () => () => {
      levaStore.clearPath('myNumber')
    },
    []
  )
  return <div data-testid={id ?? 'value'}>{myNumber}</div>
}

function NoCacheOptionComponent({ id }: { id?: string }) {
  const { myNumber } = useControls({ myNumber: { value: 5, noCache: true } }, { headless: true })
  return <div data-testid={id ?? 'value'}>{myNumber}</div>
}

describe('useControls mount/unmount lifecycle', () => {
  it('does not clear a path that is still mounted', () => {
    const { unmount } = render(<NumberComponent id="value" />)

    act(() => {
      levaStore.setValueAtPath('myNumber', 42, true)
    })

    // clearPath is a no-op while the component is still mounted (__refCount > 0)
    levaStore.clearPath('myNumber')
    expect(levaStore.get('myNumber')).toBe(42)

    unmount()
  })

  it('works with nested folder paths', () => {
    const { getByTestId, unmount } = render(<NestedNumberComponent id="value" />)
    expect(getByTestId('value').textContent).toBe('5')

    act(() => {
      levaStore.setValueAtPath('myFolder.myNumber', 42, true)
    })
    expect(getByTestId('value').textContent).toBe('42')

    unmount()
    levaStore.clearPath('myFolder.myNumber')

    const { getByTestId: getByTestId2 } = render(<NestedNumberComponent id="value2" />)
    expect(getByTestId2('value2').textContent).toBe('5')
  })

  it('preserves the value on remount when not cleared', () => {
    const { unmount } = render(<NumberComponent id="value" />)

    act(() => {
      levaStore.setValueAtPath('myNumber', 42, true)
    })

    act(() => unmount())

    // value survives unmount without clearing
    expect(levaStore.get('myNumber')).toBe(42)
  })

  it('useEffect clearPath resets the value on remount', () => {
    const { getByTestId, unmount } = render(<NumberComponentNoCache id="value" />)
    expect(getByTestId('value').textContent).toBe('5')

    act(() => {
      levaStore.setValueAtPath('myNumber', 42, true)
    })
    expect(getByTestId('value').textContent).toBe('42')

    act(() => unmount())

    const { getByTestId: getByTestId2 } = render(<NumberComponentNoCache id="value2" />)
    expect(getByTestId2('value2').textContent).toBe('5')
  })

  it('noCache option resets the value on remount', () => {
    const { getByTestId, unmount } = render(<NoCacheOptionComponent id="value" />)
    expect(getByTestId('value').textContent).toBe('5')

    act(() => {
      levaStore.setValueAtPath('myNumber', 42, true)
    })
    expect(getByTestId('value').textContent).toBe('42')

    act(() => unmount())

    const { getByTestId: getByTestId2 } = render(<NoCacheOptionComponent id="value2" />)
    expect(getByTestId2('value2').textContent).toBe('5')
  })

  it('store-level noCache resets all inputs on remount', () => {
    levaStore.setNoCache(true)

    const { getByTestId, unmount } = render(<NumberComponent id="value" />)
    expect(getByTestId('value').textContent).toBe('5')

    act(() => {
      levaStore.setValueAtPath('myNumber', 42, true)
    })
    expect(getByTestId('value').textContent).toBe('42')

    act(() => unmount())

    const { getByTestId: getByTestId2 } = render(<NumberComponent id="value2" />)
    expect(getByTestId2('value2').textContent).toBe('5')
  })

  it('LevaPanel noCache prop wires to store and resets inputs on remount', () => {
    // LevaPanel and the consuming component are rendered in separate trees so
    // that unmounting the component doesn't also unmount LevaPanel (which would
    // trigger the cleanup that resets noCache to false before the
    // component's own cleanup can call clearPath).
    const { unmount: unmountPanel } = render(<LevaPanel store={levaStore} noCache />)

    const { getByTestId, unmount: unmountComponent } = render(<NumberComponent id="value" />)
    expect(getByTestId('value').textContent).toBe('5')

    act(() => {
      levaStore.setValueAtPath('myNumber', 42, true)
    })
    expect(getByTestId('value').textContent).toBe('42')

    act(() => unmountComponent())

    const { getByTestId: getByTestId2 } = render(<NumberComponent id="value2" />)
    expect(getByTestId2('value2').textContent).toBe('5')

    unmountPanel()
  })

  it('resets to the initial value when remounted after clearPath', () => {
    const { getByTestId, unmount } = render(<NumberComponent id="value" />)
    expect(getByTestId('value').textContent).toBe('5')

    act(() => {
      levaStore.setValueAtPath('myNumber', 42, true)
    })
    expect(getByTestId('value').textContent).toBe('42')

    unmount()
    levaStore.clearPath('myNumber')

    const { getByTestId: getByTestId2 } = render(<NumberComponent id="value2" />)
    expect(getByTestId2('value2').textContent).toBe('5')
  })
})
