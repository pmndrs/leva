import { useState, useEffect } from 'react'
import { StoreType } from '../../store'
import shallow from 'zustand/shallow'

/**
 * Hook used by the root component to get all visible inputs.
 */
export const useVisiblePaths = (store: StoreType) => {
  const [state, setState] = useState(store.getVisiblePaths(store.getData()))

  useEffect(() => {
    setState(store.getVisiblePaths(store.getData()))
    const unsub = store.useStore.subscribe(setState, (s) => store.getVisiblePaths(s.data), shallow)
    return () => unsub()
  }, [store])

  return state
}
