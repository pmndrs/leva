import create, { UseStore } from 'zustand'
import { normalizeInput, join, updateInput } from './utils'

import { Data, FolderSettings, SpecialInputTypes } from './types'

type State = { data: Data }

export type StoreType = {
  useStore: UseStore<State>
  disposePaths: (paths: string[]) => void
  getData: () => Data
  setOrderedPaths: (newPaths: string[]) => void
  setData: (newData: Data) => void
  setValueAtPath: (path: string, value: any) => void
  getValueAtPath: (path: string) => any
  orderPathsFromData: (initialData: Data) => string[]
  getFolderSettings: (path: string) => FolderSettings
  getVisiblePaths: (data: Data) => string[]
  getDataFromSchema: (schema: any, rootPath?: string) => Data
}

const Store = (function (this: StoreType) {
  const store = create<State>(() => ({ data: {} }))
  this.useStore = store
  /**
   * Folders will hold the folder settings for the pane.
   * @note possibly make this reactive
   */
  const folders: Record<string, FolderSettings> = {}

  /**
   * OrderedPaths will hold all the paths in a parent -> children order.
   * This will ensure we can display the controls in a predictable order.
   */
  const orderedPaths = new Set<String>()
  /**
   * When the useControls hook unmmounts, it will call this function that will
   * decrease the count of all the inputs. When an input count reaches 0, it
   * should no longer be displayed in the panel.
   *
   * @param paths
   */
  this.disposePaths = (paths) => {
    store.setState((s) => {
      const data = s.data
      paths.forEach((path) => data[path].count--)
      return { data }
    })
  }

  // Shorthand to get zustand store data
  this.getData = () => {
    return store.getState().data
  }

  // adds paths to OrderedPaths
  this.setOrderedPaths = (newPaths) => {
    newPaths.forEach((p) => orderedPaths.add(p))
  }

  /**
   * Merges the data passed as an argument with the store data.
   * If an input path from the data already exists in the store,
   * the function doesn't update the data but increments count
   * to keep track of how many components use that input key.
   *
   * @param newData the data to update
   */
  this.setData = (newData) => {
    store.setState((s) => {
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
  this.setValueAtPath = (path, value) => {
    store.setState((s) => {
      const data = s.data
      //@ts-expect-error (we always update inputs with a value)
      updateInput(data[path], value)
      return { data }
    })
  }

  this.getValueAtPath = (path) => {
    //@ts-expect-error
    return store.getState().data[path].value
  }

  this.orderPathsFromData = (initialData) => {
    const paths = Object.keys(initialData)
    this.setOrderedPaths(paths)
    return paths
  }

  this.getFolderSettings = (path) => {
    return folders[path]
  }

  /**
   * For a given data structure, gets all paths for which inputs have
   * a reference count superior to zero. This function is used by the
   * root pane to only display the inputs that are consumed by mounted
   * components.
   *
   * @param data
   */
  this.getVisiblePaths = (data) => {
    const visiblePaths: string[] = []
    orderedPaths.forEach((path: any) => {
      if (data[path]?.count > 0 && (!data[path].render || data[path].render!(this.getValueAtPath)))
        visiblePaths.push(path)
    })

    return visiblePaths
  }

  /**
   * Recursively extract the data from the schema, sets folder initial
   * preferences and normalize the inputs (normalizing an input means parsing the
   * input object, identify its type and normalize its settings).
   *
   * @param schema
   * @param rootPath used for recursivity
   */
  this.getDataFromSchema = (schema, rootPath = '') => {
    const data: any = {}
    const paths: string[] = []

    Object.entries(schema).forEach(([path, input]: [string, any]) => {
      const newPath = join(rootPath, path)

      // If the input is a folder, then we recursively parse its schema and assign
      // it to the current data.
      if (input.type === SpecialInputTypes.FOLDER) {
        Object.assign(data, this.getDataFromSchema(input.schema, newPath))

        // Sets folder preferences
        folders[newPath] = input.settings as FolderSettings
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

    return data
  }
} as any) as { new (): StoreType }

export const store = new Store()

if (process.env.NODE_ENV === 'development' && typeof window !== 'undefined') {
  // TODO remove store from window
  // @ts-expect-error
  window.__LEVA__STORE = store
}
