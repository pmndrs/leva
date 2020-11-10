import create from 'zustand'
import shallow from 'zustand/shallow'
import { join, normalizeInput } from './utils'
import { Data, Value } from './types'

type State = {
  data: Data
}

const store = create<State>(() => ({ data: {} }))
export const useStore = store

// @ts-expect-error
window.store = store

export const getStoreData = () => store.getState().data

export const setStoreData = (data: Data) => store.setState(s => ({ data: { ...s.data, ...data } }))

export const setValueForPath = (path: string, value: Value) =>
  store.setState(s => {
    const current = s.data[path]
    return { data: { ...s.data, [path]: { ...current, value } } }
  })

const getVisiblePaths = (data: Data) =>
  Object.entries(data)
    .map(([path, { count }]) => (count > 0 ? path : undefined))
    .filter(Boolean) as string[]

export const useVisiblePaths = () => useStore(s => getVisiblePaths(s.data), shallow)

export function useValueType(path: string) {
  return useStore(s => {
    const { value, type, settings } = s.data[path]
    return { value, type, settings }
    // TODO fix pick types
    // return pick(s.data[path], ['value', 'settings', 'type'])
  }, shallow)
}

// @ts-expect-error
export const init = (rootPath?: string, schema) => {
  const paths: string[] = []
  const _data: Data = {}
  const data = getStoreData()
  // @ts-expect-error
  schema.flat().forEach(item => {
    // @ts-expect-error
    Object.entries(item).forEach(([key, value]: [string, Value]) => {
      const path = join(rootPath, key)
      const current = data[path]
      if (current) {
        _data[path] = { ...current, count: current.count + 1 }
      } else {
        // TODO not sure why tsdx throws an error here
        // @ts-ignore
        _data[path] = { ...normalizeInput(value), count: 1 }
      }

      paths.push(path)
    })
  })
  return [paths, _data] as [string[], Data]
}

export const disposePaths = (paths: string[]) => {
  const data = getStoreData()
  const _data: Data = {}
  paths.forEach(path => {
    const { count, ...current } = data[path]
    _data[path] = { ...current, count: count - 1 }
  })
  setStoreData(_data)
}
