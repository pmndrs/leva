/**
 * Convenience hooks for building custom UIs with Leva headless
 */

import { useMemo, useState, useEffect, useCallback } from 'react'
// Note: zustand/shallow exports as default export, not named export
import shallow from 'zustand/shallow'
import { levaStore } from '../store'
import { useVisiblePaths } from '../hooks/useVisiblePaths'
import { buildTree } from '../components/Leva/tree'
import type { StoreType, DataInput, Tree, Data, DataItem } from '../types/internal'

// Input type without the internal __refCount property
type Input = Omit<DataItem, '__refCount'>

// Helper to get input at path (from useInput.ts)
const getInputAtPath = (data: Data, path: string): Input | null => {
  if (!data[path]) return null
  const { __refCount, ...input } = data[path]
  return input
}

/**
 * Returns an array of all visible inputs with their full metadata.
 * Useful for rendering a flat list of controls.
 *
 * @param store - Optional custom store (defaults to global levaStore)
 * @returns Array of objects containing path and input metadata
 *
 * @example
 * ```tsx
 * const inputs = useLevaInputs()
 * inputs.forEach(({ path, input }) => {
 *   console.log(`${path}: ${input.value}`)
 * })
 * ```
 */
export function useLevaInputs(store: StoreType = levaStore) {
  const paths = useVisiblePaths(store)

  return useMemo(() => {
    const data = store.getData()
    return paths.map((path) => ({
      path,
      input: data[path] as DataInput,
    }))
  }, [store, paths])
}

/**
 * Returns the folder tree structure of all visible inputs.
 * Useful for rendering hierarchical/folder-based UIs.
 *
 * @param store - Optional custom store (defaults to global levaStore)
 * @param filter - Optional filter string to search input names
 * @returns Tree structure with folders and inputs
 *
 * @example
 * ```tsx
 * const tree = useLevaTree()
 * // tree = { folder1: { input1: {...}, input2: {...} }, input3: {...} }
 * ```
 */
export function useLevaTree(store: StoreType = levaStore, filter?: string): Tree {
  const paths = useVisiblePaths(store)
  return useMemo(() => buildTree(paths, filter), [paths, filter])
}

/**
 * Hook to get and control a specific input by path.
 * Works without context - uses store parameter directly.
 *
 * @param path - The path to the input (e.g., "folder.myNumber")
 * @param store - Optional custom store (defaults to global levaStore)
 * @returns Object with input data and control methods, or null if input doesn't exist
 *
 * @example
 * ```tsx
 * const input = useLevaInput("myFolder.count")
 * if (input) {
 *   console.log(input.value, input.type, input.settings)
 *   input.set(newValue)
 * }
 * ```
 */
export function useLevaInput(path: string, store: StoreType = levaStore) {
  const [input, setInput] = useState<Input | null>(() => getInputAtPath(store.getData(), path))

  // Subscribe to changes in the input at this path
  useEffect(() => {
    setInput(getInputAtPath(store.getData(), path))
    const unsub = store.useStore.subscribe((s) => getInputAtPath(s.data, path), setInput, { equalityFn: shallow })
    return () => unsub()
  }, [store, path])

  // Memoize control methods
  const set = useCallback((value: any) => store.setValueAtPath(path, value, true), [path, store])
  const setSettings = useCallback((settings: any) => store.setSettingsAtPath(path, settings), [path, store])
  const disable = useCallback((flag: boolean) => store.disableInputAtPath(path, flag), [path, store])
  const emitOnEditStart = useCallback(() => store.emitOnEditStart(path), [path, store])
  const emitOnEditEnd = useCallback(() => store.emitOnEditEnd(path), [path, store])

  return useMemo(() => {
    if (!input) return null

    return {
      path,
      input,
      set,
      setSettings,
      disable,
      emitOnEditStart,
      emitOnEditEnd,
      storeId: store.storeId,
    }
  }, [input, path, set, setSettings, disable, emitOnEditStart, emitOnEditEnd, store.storeId])
}
