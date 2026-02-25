/**
 * Integration tests for useControls with store lifecycle
 */

// Mock stitches to avoid CSS-in-JS insertRule errors in jsdom.
// @stitches/react is imported transitively via useControls -> components/Leva -> stitches.config.ts.
// The mock is scoped to this file and doesn't affect production code.
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

import React, { useEffect } from 'react'
import { describe, it, expect, vi, afterEach } from 'vitest'
import { render, act } from '@testing-library/react'
import { useControls } from './useControls'
import { levaStore } from './store'

afterEach(() => {
  levaStore.dispose()
})

function NumberComponent({ id }: { id?: string }) {
  const { myNumber } = useControls({ myNumber: 5 }, { headless: true })
  return <div data-testid={id ?? 'value'}>{myNumber}</div>
}

function NestedNumberComponent({ id }: { id?: string }) {
  const { myNumber } = useControls('myFolder', { myNumber: 5 }, { store: levaStore, headless: true })
  return <div data-testid={id ?? 'value'}>{myNumber}</div>
}

function NumberComponentClearOnUnmount({ id }: { id?: string }) {
  const { myNumber } = useControls({ myNumber: 5 }, { headless: true })
  useEffect(() => () => { levaStore.clearPath('myNumber') }, [])
  return <div data-testid={id ?? 'value'}>{myNumber}</div>
}

function ClearOnUnmountOptionComponent({ id }: { id?: string }) {
  const { myNumber } = useControls({ myNumber: { value: 5, clearOnUnmount: true } }, { headless: true })
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
    const { getByTestId, unmount } = render(<NumberComponentClearOnUnmount id="value" />)
    expect(getByTestId('value').textContent).toBe('5')

    act(() => {
      levaStore.setValueAtPath('myNumber', 42, true)
    })
    expect(getByTestId('value').textContent).toBe('42')

    act(() => unmount())

    const { getByTestId: getByTestId2 } = render(<NumberComponentClearOnUnmount id="value2" />)
    expect(getByTestId2('value2').textContent).toBe('5')
  })

  it('clearOnUnmount option resets the value on remount', () => {
    const { getByTestId, unmount } = render(<ClearOnUnmountOptionComponent id="value" />)
    expect(getByTestId('value').textContent).toBe('5')

    act(() => {
      levaStore.setValueAtPath('myNumber', 42, true)
    })
    expect(getByTestId('value').textContent).toBe('42')

    act(() => unmount())

    const { getByTestId: getByTestId2 } = render(<ClearOnUnmountOptionComponent id="value2" />)
    expect(getByTestId2('value2').textContent).toBe('5')
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
