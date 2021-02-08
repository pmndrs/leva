import { useMemo } from 'react'
import { Store, StoreType } from '../store'
import { Schema, SchemaToValues } from '../types'
import { useRootControls, HookSettings } from './useRootControls'

export function usePanel<S extends Schema>(schema: S, settings?: HookSettings): [SchemaToValues<S>, StoreType]
export function usePanel<S extends Schema>(folderName: string, schema: S): [SchemaToValues<S>, StoreType]

/**
 * Behaves like the main hook but uses its own store.
 *
 */
export function usePanel(nameOrSchema: any, schemaOrSettings?: any) {
  const store = useMemo(() => new Store(), [])
  const values = useRootControls(store, nameOrSchema, schemaOrSettings)
  return [values as any, store]
}
