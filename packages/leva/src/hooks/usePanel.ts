import { useRootControls, HookSettings, SchemaOrFn } from './useRootControls'
import { Schema } from '../types'

/**
 * Behaves like the main hook but uses its own store.
 *
 */
export function usePanel<S extends Schema, F extends SchemaOrFn<S>>(
  nameOrSchema: string | F,
  schemaOrSettings?: F | HookSettings,
  settingsOrUndefined?: HookSettings
) {
  return useRootControls(null, nameOrSchema, schemaOrSettings, settingsOrUndefined)
}
