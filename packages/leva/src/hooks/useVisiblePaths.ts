import { useState, useEffect } from 'react'
import shallow from 'zustand/shallow'
import type { LevaStore } from '../types'

/**
 * Hook used by the root component to get all visible inputs.
 */
export const useVisiblePaths = (store: LevaStore) => {
  const [paths, setPaths] = useState(store.getVisiblePaths())

  useEffect(() => {
    const unsub = store.dataStore.subscribe(store.getVisiblePaths, setPaths, {
      fireImmediately: true,
      equalityFn: shallow,
    })
    return () => unsub()
  }, [store])

  return paths
}
