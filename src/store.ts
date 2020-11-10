import create from 'zustand'
import shallow from 'zustand/shallow'
import { join, normalizeInput, pick, getKeyPath } from './utils'
import { Data, Value } from './types'

// TODO add folder settings
type State = { data: Data }

const _store = create<State>(() => ({ data: {} }))
const useStore = _store

const getData = () => _store.getState().data
const setData = (data: Data) => _store.setState(s => ({ data: { ...s.data, ...data } }))
const setValueAtPath = (path: string, value: Value) => {
  _store.setState(s => {
    const current = s.data[path]
    return { data: { ...s.data, [path]: { ...current, value } } }
  })
}

const getVisiblePaths = (data: Data) =>
  Object.entries(data)
    .map(([path, { count }]) => (count > 0 ? path : undefined))
    .filter(Boolean) as string[]

export const useVisiblePaths = () => useStore(s => getVisiblePaths(s.data), shallow)

const getValuesForPaths = (data: Data, paths: string[]) =>
  Object.entries(pick(data, paths) as Data).reduce(
    (acc, [path, { value }]) => ({ ...acc, [getKeyPath(path)[0]!]: value }),
    {} as { [path: string]: Value }
  )

export const useValuesForPath = (paths: string[]) => useStore(s => getValuesForPaths(s.data, paths), shallow)

export function useInput(path: string) {
  return useStore(s => {
    const { value, type, settings } = s.data[path]
    return { value, type, settings }
    // TODO fix pick types
    // return pick(s.data[path], ['value', 'settings', 'type'])
  }, shallow)
}

// @ts-expect-error
const getDataFromSchema = (rootPath?: string, schema) => {
  const paths: string[] = []
  const _data: Data = {}
  const data = getData()
  // @ts-expect-error
  schema.flat().forEach(item => {
    // @ts-expect-error
    Object.entries(item).forEach(([key, value]: [string, Value]) => {
      const path = join(rootPath, key)
      const currentInput = data[path]
      if (currentInput) {
        _data[path] = { ...currentInput, count: currentInput.count + 1 }
      } else {
        // TODO not sure why tsdx throws an error here
        // @ts-ignore
        _data[path] = { ...normalizeInput(value), count: 1 }
      }

      paths.push(path)
    })
  })
  return [_data, paths] as [Data, string[]]
}

const disposePaths = (paths: string[]) => {
  const data = getData()
  const _data: Data = {}
  paths.forEach(path => {
    const { count, ...current } = data[path]
    _data[path] = { ...current, count: count - 1 }
  })
  setData(_data)
}

export const store = {
  getData,
  setData,
  setValueAtPath,
  getDataFromSchema,
  disposePaths,
}

// TODO remove this
// @ts-expect-error
window.store = store
