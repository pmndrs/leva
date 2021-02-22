import { useEffect, useMemo, useCallback } from 'react'
import { StoreType } from '../store'
import { folder } from '../helpers'
import { useValuesForPath, useShallow } from '../utils/hooks'
import { FolderSettings, Schema, SchemaToValues } from '../types'

// export type HookSettings = { show?: boolean }
export type SchemaOrFn<S extends Schema = Schema> = S | (() => S)
export type DepsCompare = React.DependencyList | ((prev: Schema, next: Schema) => boolean)

type FunctionReturnType<S extends Schema> = [SchemaToValues<S>, StoreType, (value: Partial<SchemaToValues<S>>) => void]

export type HookReturnType<F extends SchemaOrFn, ReturnStore = false> = F extends SchemaOrFn<infer S>
  ? F extends Function
    ? FunctionReturnType<S>
    : ReturnStore extends true
    ? FunctionReturnType<S>
    : SchemaToValues<S>
  : never

function parseArgs(
  nameOrSchema: string | SchemaOrFn,
  schemaOrDeps?: SchemaOrFn | DepsCompare,
  folderSettingsOrDeps?: FolderSettings | DepsCompare,
  depsOrUndefined?: DepsCompare
) {
  let schema: SchemaOrFn
  let name: string | undefined = undefined
  let folderSettings: FolderSettings | undefined
  let deps: DepsCompare | undefined

  if (typeof nameOrSchema === 'string') {
    schema = schemaOrDeps as SchemaOrFn
    name = nameOrSchema
    if (Array.isArray(folderSettingsOrDeps)) deps = folderSettingsOrDeps
    else {
      folderSettings = folderSettingsOrDeps as FolderSettings
      deps = depsOrUndefined
    }
  } else {
    schema = nameOrSchema as SchemaOrFn
    deps = schemaOrDeps as DepsCompare
  }

  const schemaIsFunction = typeof schema === 'function'

  return {
    schemaIsFunction,
    schema: schemaIsFunction ? (schema as Function)() : schema,
    name,
    folderSettings,
    deps: deps || [],
  }
}

function returnSchema(schema: Schema, name?: string, folderSettings?: FolderSettings) {
  return name ? { [name]: folder(schema, folderSettings) } : schema
}

/**
 *
 * @param store the store consumed by the hook
 * @param nameOrSchema the schema or the name of the folder
 * @param schemaOrDeps the schema (if a name was provided) or the dependencies
 * @param folderSettingsOrDeps the folder settings (if a name was provided) or the deps
 * @param depsOrUndefined // the deps (only if a name was provided)
 * @param returnStore // will return [input, store, set] if true (used by usePanel)
 */
export function useRootControls<S extends Schema, F extends SchemaOrFn<S>, RT extends boolean = false>(
  store: StoreType,
  nameOrSchema: string | F,
  schemaOrDeps?: F | DepsCompare,
  folderSettingsOrDeps?: FolderSettings | DepsCompare,
  depsOrUndefined?: DepsCompare,
  returnStore?: RT
): HookReturnType<F, RT> {
  // We parse the args
  const { name, schema, folderSettings, deps, schemaIsFunction } = useMemo(
    () => parseArgs(nameOrSchema, schemaOrDeps, folderSettingsOrDeps, depsOrUndefined),
    [nameOrSchema, schemaOrDeps, folderSettingsOrDeps, depsOrUndefined]
  )

  // Since the schema object would change on every render, we let the user have
  // control over when it should trigger a reset of the hook inputs.
  const _schema = useShallow(schema, () => returnSchema(schema, name, folderSettings), deps)
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

  /**
   * @note The below used the settings.show api to conditionnally render the hook.
   * Removed for now,
   */

  /* 
  useEffect(() => {
    // We initialize the store with the initialData in useEffect.
    // Note that doing this while rendering (ie in useMemo) would make
    // things easier and remove the need for initializing useValuesForPath but
    // it breaks the ref from Monitor.

    // TODO optimize this
    if (settings.show || firstRender.current) store.addData(initialData)
    if (!settings.show) store.disposePaths(paths)
    firstRender.current = false
  }, [settings.show, store, paths, initialData])
  */

  if (schemaIsFunction || returnStore) return [values, store, set] as any
  return values as any
}
