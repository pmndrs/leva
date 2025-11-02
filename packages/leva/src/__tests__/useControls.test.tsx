import { describe, expect, it } from 'vitest'
import { renderHook, waitFor } from '@testing-library/react'
import { useControls } from '../useControls'
import { levaStore } from '../store'

describe('useControls', () => {
  it('should return values from schema', async () => {
    const { result } = renderHook(() =>
      useControls({
        number: 5,
        string: 'test',
        boolean: true,
      })
    )

    expect(result.current).toEqual({
      number: 5,
      string: 'test',
      boolean: true,
    })

    // Verify data is in the store
    await waitFor(() => {
      const storeData = levaStore.getData()
      expect(storeData['number']).toBeDefined()
      expect(storeData['string']).toBeDefined()
      expect(storeData['boolean']).toBeDefined()
    })

    // Verify visible paths
    await waitFor(() => {
      const visiblePaths = levaStore.getVisiblePaths()
      expect(visiblePaths.length).toBeGreaterThan(0)
      expect(visiblePaths).toContain('number')
      expect(visiblePaths).toContain('string')
      expect(visiblePaths).toContain('boolean')
    })
  })

  it('should have all controls from two different components in the store', async () => {
    // Mount first component
    const { result: result1 } = renderHook(() =>
      useControls({
        name: 'John',
        age: 30,
      })
    )

    // Mount second component
    const { result: result2 } = renderHook(() =>
      useControls({
        city: 'NYC',
        active: true,
      })
    )

    expect(result1.current).toEqual({
      name: 'John',
      age: 30,
    })

    expect(result2.current).toEqual({
      city: 'NYC',
      active: true,
    })

    // Verify all controls from both components are in the store
    await waitFor(() => {
      const storeData = levaStore.getData()
      expect(storeData['name']).toBeDefined()
      expect(storeData['age']).toBeDefined()
      expect(storeData['city']).toBeDefined()
      expect(storeData['active']).toBeDefined()
    })

    // Verify all visible paths
    await waitFor(() => {
      const visiblePaths = levaStore.getVisiblePaths()
      expect(visiblePaths).toContain('name')
      expect(visiblePaths).toContain('age')
      expect(visiblePaths).toContain('city')
      expect(visiblePaths).toContain('active')
      expect(visiblePaths.length).toBeGreaterThanOrEqual(4)
    })
  })

  it('should remove controls from visible paths when a hook unmounts', async () => {
    // Mount first component
    const { unmount: unmountFirst } = renderHook(() =>
      useControls({
        name: 'John',
        age: 30,
      })
    )

    // Mount second component
    renderHook(() =>
      useControls({
        city: 'NYC',
        active: true,
      })
    )

    // Verify all controls are visible initially
    await waitFor(() => {
      const visiblePaths = levaStore.getVisiblePaths()
      expect(visiblePaths).toContain('name')
      expect(visiblePaths).toContain('age')
      expect(visiblePaths).toContain('city')
      expect(visiblePaths).toContain('active')
    })

    // Unmount first component
    unmountFirst()

    // Verify first component's controls are no longer visible
    await waitFor(() => {
      const visiblePaths = levaStore.getVisiblePaths()
      expect(visiblePaths).not.toContain('name')
      expect(visiblePaths).not.toContain('age')
      // Second component's controls should still be visible
      expect(visiblePaths).toContain('city')
      expect(visiblePaths).toContain('active')
    })
  })
})
