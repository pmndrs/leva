import { useRef } from 'react'
import shallow from 'zustand/shallow'
import { getValuesForPaths } from '../utils/data'
import type { Data, StoreType } from '../types'

/**
 * Hook that returns the values from the zustand store for the given paths.
 * @param paths paths for which to return values
 * @param initialData
 */
export function useValuesForPath(store: StoreType, paths: string[], initialData: Data) {
  // init is used to know when to prompt duplicate key errors to the user.
  // We don't want to show the errors on every render, only when the hook
  // is first used!
  const init = useRef(true)

  const valuesForPath = store.useStore((s) => {
    const data = init.current ? initialData : s.data
    return getValuesForPaths(data, paths)
  }, shallow)

  init.current = false
  return valuesForPath
}
