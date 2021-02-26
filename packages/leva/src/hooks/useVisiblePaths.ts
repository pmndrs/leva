import { useState, useEffect } from 'react'
import { StoreType } from '../store'
import shallow from 'zustand/shallow'

/**
 * Hook used by the root component to get all visible inputs.
 */
export const useVisiblePaths = (store: StoreType) => {
  const [paths, setPaths] = useState(store.getVisiblePaths())

  useEffect(() => {
    setPaths(store.getVisiblePaths())
    const unsub = store.useStore.subscribe(setPaths, store.getVisiblePaths, shallow)
    return () => unsub()
  }, [store])

  return paths
}
