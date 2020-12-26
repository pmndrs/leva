import { useRef } from 'react'
import create from 'zustand'
import shallow from 'zustand/shallow'
import { normalizeInput, pick, getKeyPath, join } from './utils'
import { warn, TwixErrors } from './utils/log'
import { Data, FolderSettings, Folders, SpecialInputTypes } from './types'

type State = { data: Data }

// zustand store
const _store = create<State>(() => ({ data: {} }))
const useStore = _store

// shorthand to get zustand store data
const getData = () => _store.getState().data

/**
 * Merges the data passed as an argument with the store data.
 * If an input path from the data already exists in the store,
 * the function doesn't update the data but increments count
 * to keep track of how many components use that input key.
 * @param newData the data to update
 */
function setData(newData: Data) {
  _store.setState(s => {
    const data = s.data

    Object.entries(newData).forEach(([path, value]) => {
      const input = data[path]
      // if an input already exists at the path, increment
      // the reference count.
      if (input) input.count++
      // if not, create a path for the input.
      else data[path] = { ...value, count: 1 }
    })

    // TODO not sure about direct mutation but since this
    // returns a new object that should work and trigger
    // a re-render.
    return { data }
  })
}

/**
 * Shorthand function to set the value of an input at a given path.
 * @param path path of the input
 * @param value new value of the input
 */
function setValueAtPath(path: string, value: any) {
  _store.setState(s => {
    const current = s.data[path]
    return { data: { ...s.data, [path]: { ...current, value } } }
  })
}

/**
 * For a given data structure, gets all paths for which inputs have
 * a reference count superior to zero. This function is used by the
 * root pane to only display the inputs that are consumed by mounted
 * components.
 * @param data
 */
function getVisiblePaths(data: Data) {
  return Object.entries(data)
    .map(([path, { count }]) => (count > 0 ? path : undefined))
    .filter(Boolean) as string[]
}

/**
 * Hook used by the root component to get all visible inputs.
 */
export const useVisiblePaths = () => useStore(s => getVisiblePaths(s.data), shallow)

function getValuesForPaths(data: Data, paths: string[], shouldWarn: boolean) {
  return Object.entries(pick(data, paths) as Data).reduce(
    // getValuesForPath is only called from paths that are inputs, so
    // they always have a value
    // @ts-expect-error
    (acc, [path, { value }]) => {
      const [key] = getKeyPath(path)
      // if a key already exists in the accumulator, prompt an error.
      if (acc[key] !== undefined) {
        if (shouldWarn) warn(TwixErrors.DUPLICATE_KEYS, key, path)
        return acc
      }
      return { ...acc, [key]: value }
    },
    {} as { [path: string]: any }
  )
}

/**
 * Hook that returns the values from the zustand store for the given paths.
 * @param paths paths for which to return values
 * @param initialData
 */
export function useValuesForPath(paths: string[], initialData: Data) {
  // init is used to know when to prompt duplicate key errors to the user.
  // We don't want to show the errors on every render, only when the hook
  // is first used!
  const init = useRef(true)

  const valuesForPath = useStore(s => {
    const data = init.current ? initialData : s.data
    return getValuesForPaths(data, paths, init.current)
  }, shallow)

  init.current = false
  return valuesForPath
}

/**
 * Return all input (value and settings) properties at a given path.
 * @param path
 */
export function useInput(path: string) {
  return useStore(s => {
    const { count, ...input } = s.data[path]
    return input
  }, shallow)
}

// possibly make this reactive
const FOLDERS: Folders = {}
export const getFolderSettings = (path: string) => (path in FOLDERS ? FOLDERS[path] : null)

/**
 * Extract the data from the schema and sets folder initial preferences.
 * @param schema
 */
export function getDataFromSchema(schema: any, rootPath = '') {
  const data: any = {}
  Object.entries(schema).forEach(([path, value]: [string, any]) => {
    // console.log({ key, value })
    const newPath = join(rootPath, path)
    if (value.type === SpecialInputTypes.FOLDER) {
      Object.assign(data, getDataFromSchema(value.schema, newPath))
      FOLDERS[newPath] = value.settings as FolderSettings
    } else {
      const input = normalizeInput(value, newPath)
      if (input) data[newPath] = input
    }
  })

  return data as Data
}

function disposePaths(paths: string[]) {
  _store.setState(s => {
    const data = s.data
    paths.forEach(path => data[path].count--)
    return { data }
  })
}

export const store = {
  getData,
  setData,
  setValueAtPath,
  disposePaths,
}

if (process.env.NODE_ENV === 'development' && typeof window !== 'undefined') {
  // TODO remove store from window
  // @ts-expect-error
  window.__TWIX__STORE = _store
}
