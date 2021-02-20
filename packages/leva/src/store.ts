import create, { UseStore } from 'zustand'
import { normalizeInput, join, updateInput, warn, LevaErrors } from './utils'

import { Data, FolderSettings, SpecialInputTypes } from './types'

type State = { data: Data }

export type StoreType = {
  useStore: UseStore<State>
  orderPaths: (paths: string[]) => string[]
  setOrderedPaths: (newPaths: string[]) => void
  disposePaths: (paths: string[], removeOnDispose?: boolean) => void
  dispose: () => void
  getVisiblePaths: () => string[]
  getFolderSettings: (path: string) => FolderSettings
  getData: () => Data
  addData: (newData: Data) => void
  setValueAtPath: (path: string, value: any) => void
  // TODO possibly better type this
  set: (values: Record<string, any>) => void
  get: (path: string) => any
  getDataFromSchema: (schema: any) => [Data, Record<string, string>]
}

export const Store = (function (this: StoreType) {
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
   * For a given data structure, gets all paths for which inputs have
   * a reference count superior to zero. This function is used by the
   * root pane to only display the inputs that are consumed by mounted
   * components.
   *
   * @param data
   */
  this.getVisiblePaths = () => {
    const data = this.getData()
    const paths = Object.keys(data)
    // identifies hiddenFolders
    const hiddenFolders: string[] = []
    Object.entries(folders).forEach(([path, settings]) => {
      if (
        // the folder settings have a render function
        settings.render &&
        // and the folder path matches a data path
        // (this can happen on first mount and could probably be solved if folder settings
        // were set together with the store data. In fact, the store data is set in useEffect
        // while folders settings are set in useMemo).
        paths.some((p) => p.indexOf(path) === 0) &&
        // the folder settings is supposed to be hidden
        !settings.render(this.get)
      )
        // then folder is hidden
        hiddenFolders.push(path + '.')
    })

    const visiblePaths: string[] = []
    orderedPaths.forEach((path: any) => {
      if (
        path in data &&
        // if input is mounted
        data[path].count > 0 &&
        // if it's not included in a hidden folder
        hiddenFolders.every((p) => path.indexOf(p) === -1) &&
        // if its render functions doesn't exists or returns true
        (!data[path].render || data[path].render!(this.get))
      )
        // then the input path is visible
        visiblePaths.push(path)
    })

    return visiblePaths
  }

  // adds paths to OrderedPaths
  this.setOrderedPaths = (newPaths) => {
    newPaths.forEach((p) => orderedPaths.add(p))
  }

  this.orderPaths = (paths) => {
    this.setOrderedPaths(paths)
    return paths
  }

  /**
   * When the useControls hook unmmounts, it will call this function that will
   * decrease the count of all the inputs. When an input count reaches 0, it
   * should no longer be displayed in the panel.
   *
   * @param paths
   */
  this.disposePaths = (paths, removeOnDispose = false) => {
    store.setState((s) => {
      const data = s.data
      paths.forEach((path) => {
        if (path in data)
          if (removeOnDispose) {
            delete data[path]
            orderedPaths.delete(path)
          } else data[path].count--
      })
      return { data }
    })
  }

  this.dispose = () => {
    store.setState(() => {
      return { data: {} }
    })
  }

  this.getFolderSettings = (path) => {
    return folders[path] || {}
  }

  // Shorthand to get zustand store data
  this.getData = () => {
    return store.getState().data
  }

  /**
   * Merges the data passed as an argument with the store data.
   * If an input path from the data already exists in the store,
   * the function doesn't update the data but increments count
   * to keep track of how many components use that input key.
   *
   * @param newData the data to update
   */
  this.addData = (newData) => {
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

  this.set = (values) => {
    store.setState((s) => {
      const data = s.data
      Object.entries(values).forEach(([path, value]) => {
        try {
          //@ts-expect-error (we always update inputs with a value)
          updateInput(data[path], value)
        } catch {}
      })
      return { data }
    })
  }

  this.get = (path) => {
    try {
      //@ts-expect-error
      return this.getData()[path].value
    } catch (e) {
      warn(LevaErrors.PATH_DOESNT_EXIST, path)
    }
  }

  /**
   * Recursively extract the data from the schema, sets folder initial
   * preferences and normalize the inputs (normalizing an input means parsing the
   * input object, identify its type and normalize its settings).
   *
   * @param schema
   * @param rootPath used for recursivity
   */
  const _getDataFromSchema = (schema: any, rootPath: string): [Data, Record<string, string>] => {
    const data: any = {}
    const mappedPaths: Record<string, string> = {}

    Object.entries(schema).forEach(([path, input]: [string, any]) => {
      let newPath = join(rootPath, path)

      // If the input is a folder, then we recursively parse its schema and assign
      // it to the current data.
      if (input.type === SpecialInputTypes.FOLDER) {
        const [newData, newPaths] = _getDataFromSchema(input.schema, newPath)
        Object.assign(data, newData)
        Object.assign(mappedPaths, newPaths)

        // Sets folder preferences if it wasn't set before
        if (!(newPath in folders)) folders[newPath] = input.settings as FolderSettings
      } else {
        // If the input is not a folder, we normalize the input.
        let _render = undefined
        let _label = undefined
        let _input = input

        // parse generic options from input object
        if (typeof input === 'object' && !Array.isArray(input)) {
          const { render, label, ...rest } = input
          _label = label
          _render = render
          _input = rest
        }
        const normalizedInput = normalizeInput(_input, newPath)
        // normalizeInput can return false if the input is not recognized.
        if (normalizedInput) {
          data[newPath] = normalizedInput
          data[newPath].key = path
          data[newPath].label = _label ?? path
          if (typeof _render === 'function') data[newPath].render = _render
          if (path in mappedPaths) {
            // if a key already exists, prompt an error.
            warn(LevaErrors.DUPLICATE_KEYS, path, newPath, mappedPaths[path])
          } else mappedPaths[path] = newPath
        }
      }
    })

    return [data, mappedPaths]
  }

  this.getDataFromSchema = (schema) => {
    return _getDataFromSchema(schema, '')
  }
} as any) as { new (): StoreType }

export const globalStore = new Store()

if (process.env.NODE_ENV === 'development' && typeof window !== 'undefined') {
  // TODO remove store from window
  // @ts-expect-error
  window.__LEVA__STORE = globalStore
}
