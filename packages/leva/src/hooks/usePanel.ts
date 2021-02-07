import { useMemo } from 'react'
import { Store, StoreType } from '../store'
import { FolderSettings, Schema, SchemaToValues } from '../types'
import { useRootControls } from './useRootControls'

type Settings = Partial<FolderSettings>

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
