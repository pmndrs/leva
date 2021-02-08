import { useEffect, useMemo, useState, useCallback } from 'react'
import { StoreType } from '../store'
import { folder } from '../helpers'
import { useValuesForPath } from '../utils/hooks'
import { Schema, SchemaToValues } from '../types'
import { uid } from '../utils'

export type HookSettings = { unique?: boolean }
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
): { schema: Schema; settings: HookSettings; schemaIsFunction: boolean } {
  if (typeof nameOrSchema === 'string') {
    const schemaIsFunction = typeof schemaOrSettings === 'function'
    // @ts-ignore
    const schema = schemaIsFunction ? schemaOrSettings() : schemaOrSettings
    const settings = settingsOrUndefined || {}
    return { schema: { [nameOrSchema]: folder(schema) }, settings, schemaIsFunction }
  } else {
    const schemaIsFunction = typeof nameOrSchema === 'function'
    // @ts-ignore
    const schema = schemaIsFunction ? nameOrSchema() : nameOrSchema
    const settings = (schemaOrSettings as HookSettings) || {}
    return { schema, settings, schemaIsFunction }
  }
}

export function useRootControls<S extends Schema, F extends SchemaOrFn<S>>(
  store: StoreType,
  nameOrSchema: string | F,
  schemaOrSettings?: F | HookSettings,
  settingsOrUndefined?: HookSettings
): HookReturnType<F> {
  // We compute this only once for performance reaasons;
  // This might cause problems if a state variable is used in the render
  // function.
  const [{ schema, settings, schemaIsFunction }] = useState(() =>
    parseArgs(nameOrSchema, schemaOrSettings, settingsOrUndefined)
  )
  const id = useMemo(() => (settings.unique ? uid() : undefined), [settings])

  /**
   * Parses the schema to extract the inputs initial data.
   *
   * This initial data will be used to initialize the store.
   *
   * Note that getDataFromSchema recursively
   * parses the schema inside nested folder.
   */
  const [initialData, mappedPaths] = useMemo(() => store.getDataFromSchema(schema, id), [store, schema, id])

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
