import { useEffect, useMemo, useCallback, useState } from 'react'
import { levaStore, StoreType } from './store'
import { folder } from './helpers'
import { useShallowMemo, useValuesForPath } from './utils/hooks'
import { FolderSettings, Schema, SchemaToValues } from './types'
import { useRenderRoot } from './components/Leva'

type HookSettings = { store?: StoreType }
type SchemaOrFn<S extends Schema = Schema> = S | (() => S)

type FunctionReturnType<S extends Schema> = [SchemaToValues<S>, (value: Partial<SchemaToValues<S>>) => void]

type ReturnType<F extends SchemaOrFn> = F extends SchemaOrFn<infer S>
  ? F extends Function
    ? FunctionReturnType<S>
    : SchemaToValues<S>
  : never

type HookReturnType<F extends SchemaOrFn | string, G extends SchemaOrFn> = F extends SchemaOrFn
  ? ReturnType<F>
  : ReturnType<G>

function parseArgs(
  schemaOrFolderName: string | SchemaOrFn,
  settingsOrDepsOrSchema?: HookSettings | React.DependencyList | SchemaOrFn,
  depsOrSettingsOrFolderSettings?: React.DependencyList | HookSettings | FolderSettings,
  depsOrSettings?: React.DependencyList | HookSettings,
  depsOrUndefined?: React.DependencyList
) {
  let schema: SchemaOrFn
  let folderName: string | undefined = undefined
  let folderSettings: FolderSettings | undefined
  let hookSettings: HookSettings | undefined
  let deps: React.DependencyList | undefined

  if (typeof schemaOrFolderName === 'string') {
    folderName = schemaOrFolderName
    schema = settingsOrDepsOrSchema as SchemaOrFn
    if (Array.isArray(depsOrSettingsOrFolderSettings)) {
      deps = depsOrSettingsOrFolderSettings
    } else {
      if (depsOrSettingsOrFolderSettings) {
        if ('store' in depsOrSettingsOrFolderSettings) {
          hookSettings = depsOrSettingsOrFolderSettings as HookSettings
          deps = depsOrSettings as React.DependencyList
        } else {
          folderSettings = depsOrSettingsOrFolderSettings as FolderSettings
          if (Array.isArray(depsOrSettings)) {
            deps = depsOrSettings as React.DependencyList
          } else {
            hookSettings = depsOrSettings as HookSettings
            deps = depsOrUndefined
          }
        }
      }
    }
  } else {
    schema = schemaOrFolderName as SchemaOrFn
    if (Array.isArray(settingsOrDepsOrSchema)) {
      deps = settingsOrDepsOrSchema as React.DependencyList
    } else {
      hookSettings = settingsOrDepsOrSchema as HookSettings
      deps = depsOrSettingsOrFolderSettings as React.DependencyList
    }
  }

  return { schema, folderName, folderSettings, hookSettings, deps: deps || [] }
}

/**
 *
 * @param schemaOrFolderName
 * @param settingsOrDepsOrSchema
 * @param folderSettingsOrDeps
 * @param depsOrUndefined
 */
export function useControls<S extends Schema, F extends SchemaOrFn<S> | string, G extends SchemaOrFn<S>>(
  schemaOrFolderName: F,
  settingsOrDepsOrSchema?: HookSettings | React.DependencyList | G,
  depsOrSettingsOrFolderSettings?: React.DependencyList | HookSettings | FolderSettings,
  depsOrSettings?: React.DependencyList | HookSettings,
  depsOrUndefined?: React.DependencyList
): HookReturnType<F, G> {
  // We parse the args
  const { folderName, schema, folderSettings, hookSettings, deps } = parseArgs(
    schemaOrFolderName,
    settingsOrDepsOrSchema,
    depsOrSettingsOrFolderSettings,
    depsOrSettings,
    depsOrUndefined
  )

  const schemaIsFunction = typeof schema === 'function'

  // Since the schema object would change on every render, we let the user have
  // control over when it should trigger a reset of the hook inputs.
  const _schema = useShallowMemo(() => {
    const s = typeof schema === 'function' ? schema() : schema
    return folderName ? { [folderName]: folder(s, folderSettings) } : s
  }, deps)

  // GlobalPanel means that no store was provided, therefore we're using the levaStore
  const isGlobalPanel = !!hookSettings?.store
  useRenderRoot(isGlobalPanel)
  const [store] = useState(() => hookSettings?.store || levaStore)

  /**
   * Parses the schema to extract the inputs initial data.
   *
   * This initial data will be used to initialize the store.
   *
   * Note that getDataFromSchema recursively
   * parses the schema inside nested folder.
   */
  const [initialData, mappedPaths] = useMemo(() => store.getDataFromSchema(_schema), [store, _schema])

  // Extracts the paths from the initialData and ensures order of paths.
  const paths = useMemo(() => store.orderPaths(Object.values(mappedPaths)), [mappedPaths, store])

  /**
   * Reactive hook returning the values from the store at given paths.
   * Essentially it flattens the keys of a nested structure.
   * For example { "folder.subfolder.valueKey": value } becomes { valueKey: value }
   *
   * initalData is going to be returned on the first render. Subsequent renders
   * will call the store data.
   * */
  const values = useValuesForPath(store, paths, initialData)

  const set = useCallback(
    (values: Record<string, any>) => {
      // @ts-ignore
      const _values = Object.entries(values).reduce((acc, [p, v]) => Object.assign(acc, { [mappedPaths[p]]: v }), {})
      store.set(_values)
    },
    [store, mappedPaths]
  )

  useEffect(() => {
    // We initialize the store with the initialData in useEffect.
    // Note that doing this while rendering (ie in useMemo) would make
    // things easier and remove the need for initializing useValuesForPath but
    // it breaks the ref from Monitor.
    store.addData(initialData)
    return () => store.disposePaths(paths)
  }, [store, paths, initialData])

  if (schemaIsFunction) return [values, set] as any
  return values as any
}
