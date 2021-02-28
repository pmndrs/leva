import { useCallback, useState, useEffect } from 'react'
import shallow from 'zustand/shallow'
import { useStoreContext } from '../context'
import { Data, DataItem } from '../types'

const getInputAtPath = (data: Data, path: string) => {
  const { count, ...input } = data[path]
  return input
}

type Input = Omit<DataItem, 'count'>

/**
 * Return all input (value and settings) properties at a given path.
 *
 * @param path
 */
export function useInput(path: string): [Input, (value: any) => void, (value: any) => void] {
  const store = useStoreContext()
  const [state, setState] = useState<Input>(getInputAtPath(store.getData(), path))

  const set = useCallback((value) => store.setValueAtPath(path, value), [path, store])
  const setSettings = useCallback((settings) => store.setSettingsAtPath(path, settings), [path, store])

  useEffect(() => {
    setState(getInputAtPath(store.getData(), path))
    const unsub = store.useStore.subscribe(setState, (s) => getInputAtPath(s.data, path), shallow)
    return () => unsub()
  }, [store, path])

  return [state, set, setSettings]
}
