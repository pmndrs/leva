import { useEffect, useMemo, useState } from 'react'
import { globalStore, Store, StoreType } from './store'
import { useRenderRoot } from './components/Leva'
import { folder } from './helpers'
import { useValuesForPath } from './hooks'
import { FolderSettings, Schema, SchemaToValues } from './types/'
import { useStoreContext } from './context'

type Settings = Partial<FolderSettings>

export function useControls<S extends Schema>(schema: S): SchemaToValues<S>
export function useControls<S extends Schema>(name: string, schema: S, settings?: Settings): SchemaToValues<S>

/**
 * Main hook of Leva. Pass an optional name and an input schema. Uses the global
 * store.
 *
 * @param nameOrSchema
 * @param schema
 * @param settings
 */
export function useControls<S extends Schema>(
  nameOrSchema: string | S,
  schema?: S,
  settings?: Settings
): SchemaToValues<S> {
  const values = useRootControls(globalStore, nameOrSchema, schema, settings)
  // Renders <Leva /> only if it's not manually rendered by the user
  useRenderRoot()

  return values as any
}

export function usePanel<S extends Schema>(schema: S): [SchemaToValues<S>, StoreType]
export function usePanel<S extends Schema>(name: string, schema: S, settings?: Settings): [SchemaToValues<S>, StoreType]

/**
 * Behaves like the main hook but uses its own store.
 *
 */
export function usePanel<S extends Schema>(
  nameOrSchema: string | S,
  schema?: S,
  settings?: Settings
): [SchemaToValues<S>, StoreType] {
  const store = useMemo(() => new Store(), [])
  const values = useRootControls(store, nameOrSchema, schema, settings)
  return [values as any, store]
}

export function usePanelControls<S extends Schema>(schema: S): SchemaToValues<S>
export function usePanelControls<S extends Schema>(name: string, schema: S, settings?: Settings): SchemaToValues<S>

/**
 * Behaves like the main hook but uses its own store.
 *
 */
export function usePanelControls<S extends Schema>(
  nameOrSchema: string | S,
  schema?: S,
  settings?: Settings
): SchemaToValues<S> {
  const store = useStoreContext()
  const values = useRootControls(store, nameOrSchema, schema, settings)
  return values as any
}

function parseArgs<S extends Schema>(
  nameOrSchema: string | S,
  schemaOrSettings: S | Settings = {},
  settingsOrUndefined?: Settings
): { schema: Schema; settings?: Settings } {
  if (typeof nameOrSchema === 'string') {
    return { schema: { [nameOrSchema]: folder(schemaOrSettings as S, settingsOrUndefined) } }
  } else {
    const settings = schemaOrSettings as Settings
    const schema = nameOrSchema as S
    return { schema, settings }
  }
}

function useRootControls<S extends Schema>(
  store: StoreType,
  nameOrSchema: string | S,
  schemaOrSettings?: S,
  settingsOrUndefined?: Settings
): SchemaToValues<S> {
  const [{ schema }] = useState(() => parseArgs(nameOrSchema, schemaOrSettings, settingsOrUndefined))

  /**
   * Parses the schema to extract the inputs initial data.
   *
   * This initial data will be used to initialize the store.
   *
   * Note that getDataFromSchema recursively
   * parses the schema inside nested folder.
   */
  const initialData = useMemo(() => store.getDataFromSchema(schema), [store, schema])

  // Extracts the paths from the initialData and ensures order of paths.
  const paths = useMemo(() => store.orderPathsFromData(initialData), [initialData, store])

  /**
   * Reactive hook returning the values from the store at given paths.
   * Essentially it flattens the keys of a nested structure.
   * For example { "folder.subfolder.valueKey": value } becomes { valueKey: value }
   *
   * initalData is going to be returned on the first render. Subsequent renders
   * will call the store data.
   * */
  const values = useValuesForPath(store, paths, initialData)

  useEffect(() => {
    // We initialize the store with the initialData in useEffect.
    // Note that doing this while rendering would makes things easier
    // and remove the need for initializing useValuesForPath but it
    // breaks the rendering cycle for some reason.

    // Old comment that I left, I have no idea what I meant 🤷‍♂️:
    // > we need to compute these in useEffect for monitors to work
    // > but this breaks the order of keys
    store.setData(initialData)
    return () => store.disposePaths(paths)
  }, [store, paths, initialData])

  return values as any
}
