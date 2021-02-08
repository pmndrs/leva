import { useEffect, useMemo, useRef, useCallback } from 'react'
import { StoreType } from '../store'
import { folder } from '../helpers'
import { useValuesForPath } from '../utils/hooks'
import { Schema, SchemaToValues } from '../types'
import { uid } from '../utils'

export type HookSettings = { unique?: boolean; show?: boolean }
export type SchemaOrFn<S extends Schema = Schema> = S | (() => S)
export type HookReturnType<F extends SchemaOrFn> = F extends SchemaOrFn<infer S>
  ? F extends Function
    ? [SchemaToValues<S>, (value: Partial<SchemaToValues<S>>) => void]
    : SchemaToValues<S>
  : never

function parseArgs(
  nameOrSchema: string | SchemaOrFn,
  schemaOrSettings?: SchemaOrFn | HookSettings,
  settingsOrUndefined?: HookSettings
): { schema: SchemaOrFn; settings: HookSettings; name?: string } {
  if (typeof nameOrSchema === 'string') {
    const settings = { show: true, ...settingsOrUndefined }
    return { schema: schemaOrSettings as SchemaOrFn, settings, name: nameOrSchema }
  } else {
    const settings = { show: true, ...schemaOrSettings }
    return { schema: nameOrSchema as SchemaOrFn, settings }
  }
}

// { [nameOrSchema]: folder(schema) }

function returnSchema(schema: SchemaOrFn, name: string | undefined) {
  const _schema = typeof schema === 'function' ? schema() : schema
  return name ? { [name]: folder(_schema) } : _schema
}

export function useRootControls<S extends Schema, F extends SchemaOrFn<S>>(
  store: StoreType,
  nameOrSchema: string | F,
  schemaOrSettings?: F | HookSettings,
  settingsOrUndefined?: HookSettings
): HookReturnType<F> {
  // We compute this only once for performance reasons;
  // This might cause problems if a state variable is used in the render
  // function.
  const { name, schema, settings } = useMemo(() => parseArgs(nameOrSchema, schemaOrSettings, settingsOrUndefined), [
    nameOrSchema,
    schemaOrSettings,
    settingsOrUndefined,
  ])

  const schemaIsFunction = typeof schema === 'function'

  const _schema = useRef(returnSchema(schema, name))
  const firstRender = useRef(true)

  const id = useMemo(() => (settings.unique ? uid() : undefined), [settings.unique])
  const unique = !!id

  /**
   * Parses the schema to extract the inputs initial data.
   *
   * This initial data will be used to initialize the store.
   *
   * Note that getDataFromSchema recursively
   * parses the schema inside nested folder.
   */
  const [initialData, mappedPaths] = useMemo(() => store.getDataFromSchema(_schema.current, id), [store, id])

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
    return () => store.disposePaths(paths, unique)
  }, [unique, store, paths])

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

  if (schemaIsFunction) return [values, set] as any
  return values as any
}
