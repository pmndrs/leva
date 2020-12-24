import { useRef } from 'react'
import create from 'zustand'
import shallow from 'zustand/shallow'
import { normalizeInput, pick, getKeyPath, FolderSettingsKey } from './utils'
import { warn, TwixErrors } from './utils/log'
import { Data, FolderSettings, Folders } from './types'

type State = { data: Data }

const _store = create<State>(() => ({ data: {} }))
const useStore = _store

const getData = () => _store.getState().data

// increments count for existing paths
const setData = (data: Data) => {
  _store.setState(s => {
    const _data = s.data
    const mergedData = Object.entries(data).reduce((acc, [key, value]) => {
      const current = _data[key]
      if (current) return { ...acc, [key]: { ...current, count: current.count! + 1 } }
      return { ...acc, [key]: { ...value, count: 1 } }
    }, {})
    return { data: { ..._data, ...mergedData } }
  })
}

const setValueAtPath = (path: string, value: any) => {
  _store.setState(s => {
    const current = s.data[path]
    return { data: { ...s.data, [path]: { ...current, value } } }
  })
}

const getVisiblePaths = (data: Data) =>
  Object.entries(data)
    .map(([path, { count }]) => (count! > 0 ? path : undefined))
    .filter(Boolean) as string[]

export const useVisiblePaths = () => useStore(s => getVisiblePaths(s.data), shallow)

const getValuesForPaths = (data: Data, paths: string[], shouldWarn: boolean) => {
  return Object.entries(pick(data, paths) as Data).reduce(
    // getValuesForPath is only called from paths that are inputs, so
    // they always have a value
    // @ts-expect-error
    (acc, [path, { value }]) => {
      const key = getKeyPath(path)[0]
      if (acc[key] !== undefined) {
        if (shouldWarn) warn(TwixErrors.DUPLICATE_KEYS, key, path)
        return acc
      }
      return { ...acc, [key]: value }
    },
    {} as { [path: string]: any }
  )
}

export const useValuesForPath = (paths: string[], initialData: Data) => {
  const init = useRef(true)

  const valuesForPath = useStore(s => {
    const data = init.current ? initialData : s.data
    return getValuesForPaths(data, paths, init.current)
  }, shallow)

  init.current = false
  return valuesForPath
}

export function useInput(path: string) {
  return useStore(s => {
    const { count, ...input } = s.data[path]
    return input
  }, shallow)
}

// possibly make this reactive
const FOLDERS: Folders = {}
export const getFolderSettings = (path: string) => (path in FOLDERS ? FOLDERS[path] : null)

// @ts-expect-error
export const getDataFromSchema = schema => {
  const _data: any = {}
  // @ts-expect-error
  schema.flat().forEach(item => {
    Object.entries(item).forEach(([path, value]: [string, any | FolderSettings]) => {
      const [key, base] = getKeyPath(path)
      if (key === FolderSettingsKey) FOLDERS[base!] = value as FolderSettings
      else {
        const input = normalizeInput(value, path)
        if (input) _data[path] = input
      }
    })
  })
  return _data as Data
}

const disposePaths = (paths: string[]) => {
  const data = getData()
  const _data: Data = {}
  paths.forEach(path => {
    const { count, ...current } = data[path]
    _data[path] = { ...current, count: count! - 1 }
  })
  setData(_data)
}

export const store = {
  getData,
  setData,
  setValueAtPath,
  disposePaths,
}

// TODO remove store from window
// @ts-expect-error
window.store = _store
