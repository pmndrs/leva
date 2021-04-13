import { useCallback, useState, useEffect } from 'react'
import shallow from 'zustand/shallow'
import { useStoreContext } from '../context'
import type { Data, DataItem } from '../types'

const getInputAtPath = (data: Data, path: string) => {
  if (!data[path]) return null
  const { __refCount, ...input } = data[path]
  return input
}

type Input = Omit<DataItem, '__refCount'>

/**
 * Return all input (value and settings) properties at a given path.
 *
 * @param path
 */
export function useInput(
  path: string
): [
  Input | null,
  {
    set: (value: any, onValueChanged?: (value: any) => void) => void
    setSettings: (value: any) => void
    disable: (flag: boolean) => void
    storeId: string
    onEditStart: (value: any) => void
    onEditEnd: (value: any) => void
  }
] {
  const store = useStoreContext()
  const [state, setState] = useState<Input | null>(getInputAtPath(store.getData(), path))

  const set = useCallback((value, onValueChanged) => store.setValueAtPath(path, value, onValueChanged), [path, store])
  const setSettings = useCallback((settings) => store.setSettingsAtPath(path, settings), [path, store])
  const disable = useCallback((flag) => store.disableInputAtPath(path, flag), [path, store])
  const onEditStart = useCallback((value: any) => store.emitOnEditStart(path, value), [path, store])
  const onEditEnd = useCallback((value: any) => store.emitOnEditEnd(path, value), [path, store])

  useEffect(() => {
    setState(getInputAtPath(store.getData(), path))
    const unsub = store.useStore.subscribe(setState, (s) => getInputAtPath(s.data, path), shallow)
    return () => unsub()
  }, [store, path])

  return [state, { set, setSettings, disable, storeId: store.storeId, onEditStart, onEditEnd }]
}
