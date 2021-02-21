import { useEffect, useMemo, useRef, useCallback } from 'react'
import { StoreType } from '../store'
import { folder } from '../helpers'
import { useValuesForPath } from '../utils/hooks'
import { FolderSettings, Schema, SchemaToValues } from '../types'

// export type HookSettings = { show?: boolean }
export type SchemaOrFn<S extends Schema = Schema> = S | (() => S)

type FunctionReturnType<S extends Schema> = [
  SchemaToValues<S>,
  {
    store: StoreType
    set: (value: Partial<SchemaToValues<S>>) => void
  }
]

export type HookReturnType<F extends SchemaOrFn, ReturnStore = false> = F extends SchemaOrFn<infer S>
  ? F extends Function
    ? FunctionReturnType<S>
    : ReturnStore extends true
    ? FunctionReturnType<S>
    : SchemaToValues<S>
  : never

function parseArgs(
  nameOrSchema: string | SchemaOrFn,
  schemaOrUndefined?: SchemaOrFn
  // settingsOrUndefined?: HookSettings
): { schema: SchemaOrFn; name?: string } {
  if (typeof nameOrSchema === 'string') {
    // const settings = { show: true, ...settingsOrUndefined }
    return { schema: schemaOrUndefined as SchemaOrFn, name: nameOrSchema }
  } else {
    // const settings = { show: true, ...schemaOrUndefined }
    return { schema: nameOrSchema as SchemaOrFn }
  }
}

// { [nameOrSchema]: folder(schema) }

function returnSchema(schema: SchemaOrFn, name: string | undefined, folderSettingsOrUndefined?: FolderSettings) {
  const _schema = typeof schema === 'function' ? schema() : schema
  return name ? { [name]: folder(_schema, folderSettingsOrUndefined) } : _schema
}

export function useRootControls<S extends Schema, F extends SchemaOrFn<S>, RT extends boolean = false>(
  store: StoreType,
  nameOrSchema: string | F,
  schemaOrUndefined?: F,
  folderSettingsOrUndefined?: FolderSettings,
  returnStore?: RT
): HookReturnType<F, RT> {
  // We compute this only once for performance reasons;
  // This might cause problems if a state variable is used in the render
  // function.
  const { name, schema } = useMemo(() => parseArgs(nameOrSchema, schemaOrUndefined), [nameOrSchema, schemaOrUndefined])

  const schemaIsFunction = typeof schema === 'function'

  const _schema = useRef(returnSchema(schema, name, folderSettingsOrUndefined))

  /**
   * Parses the schema to extract the inputs initial data.
   *
   * This initial data will be used to initialize the store.
   *
   * Note that getDataFromSchema recursively
   * parses the schema inside nested folder.
   */
  const [initialData, mappedPaths] = useMemo(() => store.getDataFromSchema(_schema.current), [store])

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

  if (schemaIsFunction || returnStore) return [values, { store, set }] as any
  return values as any
}
