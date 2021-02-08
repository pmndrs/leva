import { useStoreContext } from '../context'
import { useRootControls, HookSettings, SchemaOrFn } from './useRootControls'
import { Schema } from '../types'

/**
 * Behaves like the main hook but uses its own store.
 *
 */
export function usePanelControls<S extends Schema, F extends SchemaOrFn<S>>(
  nameOrSchema: string | F,
  schemaOrSettings?: F | HookSettings,
  settingsOrUndefined?: HookSettings
) {
  const store = useStoreContext()
  const values = useRootControls(store, nameOrSchema, schemaOrSettings, settingsOrUndefined)
  return values
}
