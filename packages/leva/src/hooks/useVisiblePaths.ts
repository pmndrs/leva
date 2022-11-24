import { useState, useEffect } from 'react'
import shallow from 'zustand/shallow'
import type { StoreType } from '../types'

/**
 * Hook used by the root component to get all visible inputs.
 */
export const useVisiblePaths = (store: StoreType) => {
  const [paths, setPaths] = useState(store.getVisiblePaths())

  useEffect(() => {
    const unsub = store.useStore.subscribe(store.getVisiblePaths, setPaths, {
      fireImmediately: true,
      equalityFn: shallow,
    })
    return () => unsub()
  }, [store])

  return paths
}
