import { useRef, useEffect } from 'react'
import shallow from 'zustand/shallow'
import { getValuesForPaths } from '../utils/data'
import type { Data, StoreType } from '../types'

/**
 * Hook that returns the values from the zustand store for the given paths.
 * @param paths paths for which to return values
 * @param initialData
 */
export function useValuesForPath(store: StoreType, paths: string[], initialData: Data) {
  // init is used to return the initialData on the first render
  const init = useRef(true)

  const valuesForPath = store.useStore((s) => {
    const data = init.current ? initialData : s.data
    return getValuesForPaths(data, paths)
  }, shallow)

  useEffect(() => {
    init.current = false
  })
  return valuesForPath
}
