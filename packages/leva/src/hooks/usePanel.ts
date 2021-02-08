import { useMemo } from 'react'
import { Store, StoreType } from '../store'
import { useRootControls, HookSettings, SchemaOrFn, HookReturnType } from './useRootControls'
import { Schema } from '../types'

export function usePanel<S extends Schema, F extends SchemaOrFn<S>>(
  schema: F,
  settings?: HookSettings
): [HookReturnType<F>, StoreType]
export function usePanel<S extends Schema, F extends SchemaOrFn<S>>(
  folderName: string,
  schema: F
): [HookReturnType<F>, StoreType]

/**
 * Behaves like the main hook but uses its own store.
 *
 */
export function usePanel(nameOrSchema: any, schemaOrSettings?: any) {
  const store = useMemo(() => new Store(), [])
  const values = useRootControls(store, nameOrSchema, schemaOrSettings)
  return [values as any, store]
}
