import shallow from 'zustand/shallow'
import { getValuesForPaths } from '../utils/data'
import type { Data, LevaStore } from '../types'
// import { useZustand } from './useZustand'

/**
 * Hook that returns the values from the zustand store for the given paths.
 * @param paths paths for which to return values
 * @param initialData
 */
export function useValuesForPath(store: LevaStore, paths: string[], initialData: Data) {
  const valuesForPath = store.dataStore((s) => {
    const data = { ...initialData, ...s.data }
    return getValuesForPaths(data, paths)
  }, shallow)

  return valuesForPath
}
