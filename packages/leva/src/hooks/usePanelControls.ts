import { useStoreContext } from '../context'
import { useRootControls, FolderSettings, HookSettings } from './useRootControls'
import { Schema, SchemaToValues } from '../types'

export function usePanelControls<S extends Schema>(schema: S, settings?: HookSettings): SchemaToValues<S>
export function usePanelControls<S extends Schema>(
  name: string,
  schema: S,
  settings?: FolderSettings
): SchemaToValues<S>

/**
 * Behaves like the main hook but uses its own store.
 *
 */
export function usePanelControls<S extends Schema>(
  nameOrSchema: string | S,
  schemaOrSettings?: S | HookSettings,
  settingsOrUndefined?: FolderSettings
): SchemaToValues<S> {
  const store = useStoreContext()
  const values = useRootControls(store, nameOrSchema, schemaOrSettings, settingsOrUndefined)
  return values as any
}
