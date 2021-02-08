import { useMemo } from 'react'
import { Store, StoreType } from '../store'
import { Schema, SchemaToValues } from '../types'
import { useRootControls, FolderSettings, HookSettings } from './useRootControls'

export function usePanel<S extends Schema>(schema: S, settings?: HookSettings): [SchemaToValues<S>, StoreType]
export function usePanel<S extends Schema>(
  name: string,
  schema: S,
  settings?: FolderSettings
): [SchemaToValues<S>, StoreType]

/**
 * Behaves like the main hook but uses its own store.
 *
 */
export function usePanel<S extends Schema>(
  nameOrSchema: string | S,
  schemaOrSettings?: S | HookSettings,
  settingsOrUndefined?: FolderSettings
): [SchemaToValues<S>, StoreType] {
  const store = useMemo(() => new Store(), [])
  const values = useRootControls(store, nameOrSchema, schemaOrSettings, settingsOrUndefined)
  return [values as any, store]
}
