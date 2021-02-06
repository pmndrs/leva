import { useRef } from 'react'
import create from 'zustand'
import shallow from 'zustand/shallow'
import { normalizeInput, pick, getKeyPath, join, updateInput } from './utils'
import { warn, LevaErrors } from './utils/log'
import { Data, DataItem, FolderSettings, SpecialInputTypes } from './types/'

type State = { data: Data }

// zustand store
const _store = create<State>(() => ({ data: {} }))

/**
 * Folders will hold the folder settings for the pane.
 * @note possibly make this reactive
 */
const Folders: Record<string, FolderSettings> = {}

/**
 * OrderedPaths will hold all the paths in a parent -> children order.
 * This will ensure we can display the controls in a predictable order.
 */
const OrderedPaths = new Set<string>()

const useStore = _store

// Shorthand to get zustand store data
const getData = () => _store.getState().data

// adds paths to OrderedPaths
function setOrderedPaths(newPaths: string[]) {
  newPaths.forEach((p) => OrderedPaths.add(p))
}

/**
 * Merges the data passed as an argument with the store data.
 * If an input path from the data already exists in the store,
 * the function doesn't update the data but increments count
 * to keep track of how many components use that input key.
 *
 * @param newData the data to update
 */
function setData(newData: Data) {
  _store.setState((s) => {
    const data = s.data

    Object.entries(newData).forEach(([path, value]) => {
      const input = data[path]
      // if an input already exists at the path, increment
      // the reference count.
      if (!!input) input.count++
      // if not, create a path for the input.
      else data[path] = { ...value, count: 1 }
    })

    // Since we're returning a new object, direct mutation of data
    // Should trigger a re-render so we're good!
    return { data }
  })
}

/**
 * Shorthand function to set the value of an input at a given path.
 *
 * @param path path of the input
 * @param value new value of the input
 */
function setValueAtPath(path: string, value: any) {
  _store.setState((s) => {
    const data = s.data
    //@ts-expect-error (we always update inputs with a value)
    updateInput(data[path], value)
    return { data }
  })
}

function getValueAtPath(path: string) {
  //@ts-expect-error
  return _store.getState().data[path].value
}

/**
 * For a given data structure, gets all paths for which inputs have
 * a reference count superior to zero. This function is used by the
 * root pane to only display the inputs that are consumed by mounted
 * components.
 *
 * @param data
 */
function getVisiblePaths(data: Data) {
  const visiblePaths: string[] = []
  OrderedPaths.forEach((path) => {
    if (data[path]?.count > 0 && (!data[path].render || data[path].render!(getValueAtPath))) visiblePaths.push(path)
  })

  return visiblePaths
}

export function orderPathFromData(initialData: Data) {
  const paths = Object.keys(initialData)
  setOrderedPaths(paths)
  return paths
}

/**
 * Hook used by the root component to get all visible inputs.
 */
export const useVisiblePaths = () => useStore((s) => getVisiblePaths(s.data), shallow)

/**
 * Takes a data object with { [path.key]: value } and returns { [key]: value }.
 * Also warns when two similar keys are being used by the user.
 *
 * @param data
 * @param paths
 * @param shouldWarn
 */
function getValuesForPaths(data: Data, paths: string[], shouldWarn: boolean) {
  return Object.entries(pick(data, paths) as Data).reduce(
    // Typescript complaints that SpecialInput type doesn't have a value key.
    // But getValuesForPath is only called from paths that are inputs,
    // so they always have a value key.

    // @ts-expect-error
    (acc, [path, { value }]) => {
      const [key] = getKeyPath(path)
      // if a key already exists in the accumulator, prompt an error.
      if (acc[key] !== undefined) {
        if (shouldWarn) warn(LevaErrors.DUPLICATE_KEYS, key, path)
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

  const valuesForPath = useStore((s) => {
    const data = init.current ? initialData : s.data
    return getValuesForPaths(data, paths, init.current)
  }, shallow)

  init.current = false
  return valuesForPath
}

/**
 * Return all input (value and settings) properties at a given path.
 *
 * @param path
 */
export function getInput(path: string): DataItem {
  return _store((s) => {
    const { count, ...input } = s.data[path]
    return input
  }, shallow)
}

export const getFolderSettings = (path: string) => Folders[path]

/**
 * Recursively extract the data from the schema, sets folder initial
 * preferences and normalize the inputs (normalizing an input means parsing the
 * input object, identify its type and normalize its settings).
 *
 * @param schema
 * @param rootPath used for recursivity
 */
export function getDataFromSchema(schema: any, rootPath = '') {
  const data: any = {}
  const paths: string[] = []

  Object.entries(schema).forEach(([path, input]: [string, any]) => {
    const newPath = join(rootPath, path)

    // If the input is a folder, then we recursively parse its schema and assign
    // it to the current data.
    if (input.type === SpecialInputTypes.FOLDER) {
      Object.assign(data, getDataFromSchema(input.schema, newPath))

      // Sets folder preferences
      Folders[newPath] = input.settings as FolderSettings
    } else {
      // If the input is not a folder, we normalize the input.

      let _render = undefined
      let _input = input

      if (typeof input === 'object' && 'render' in input) {
        const { render, ...rest } = input
        _input = rest
        _render = render
      }
      const normalizedInput = normalizeInput(_input, newPath)
      // normalizeInput can return false if the input is not recognized.
      if (normalizedInput) {
        data[newPath] = normalizedInput
        if (typeof _render === 'function') data[newPath].render = _render
        paths.push(newPath)
      }
    }
  })

  return data as Data
}

/**
 * When the useControls hook unmmounts, it will call this function that will
 * decrease the count of all the inputs. When an input count reaches 0, it
 * should no longer be displayed in the panel.
 *
 * @param paths
 */
function disposePaths(paths: string[]) {
  _store.setState((s) => {
    const data = s.data
    paths.forEach((path) => data[path].count--)
    return { data }
  })
}

export const store = {
  getData,
  setData,
  setValueAtPath,
  getValueAtPath,
  disposePaths,
  getInput,
}

if (process.env.NODE_ENV === 'development' && typeof window !== 'undefined') {
  // TODO remove store from window
  // @ts-expect-error
  window.__LEVA__STORE = _store
}
