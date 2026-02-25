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

import React from 'react'
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

  it('works with nested folder paths', async () => {
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

  it('resets to the initial value when remounted after clearPath', async () => {
    // Mount the component
    const { getByTestId, unmount } = render(<NumberComponent id="value" />)
    expect(getByTestId('value').textContent).toBe('5')

    // Simulate a value change via the store (as if the user dragged the slider)
    act(() => {
      levaStore.setValueAtPath('myNumber', 42, true)
    })
    expect(getByTestId('value').textContent).toBe('42')

    // Unmount – disposePaths decrements __refCount to 0 but the value stays in the store
    unmount()

    // Clear the cached value so the next mount starts fresh
    levaStore.clearPath('myNumber')

    // Remount – useControls reads from the schema (value: 5) because the path is gone
    const { getByTestId: getByTestId2 } = render(<NumberComponent id="value2" />)
    expect(getByTestId2('value2').textContent).toBe('5')
  })
})
