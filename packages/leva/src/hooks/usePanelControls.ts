import { useRootControls, HookSettings, SchemaOrFn } from './useRootControls'
import { useStoreContext } from '../context'
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
  // the true flag indicates that we want the hook to return the set function and the store
  return useRootControls(store, nameOrSchema, schemaOrSettings, settingsOrUndefined)
}
