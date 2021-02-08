import { globalStore } from '../store'
import { useRootControls, HookSettings, FolderSettings } from './useRootControls'
import { useRenderRoot } from '../components/Leva'
import { Schema, SchemaToValues } from '../types'

export function useControls<S extends Schema>(schema: S, settings?: HookSettings): SchemaToValues<S>
export function useControls<S extends Schema>(name: string, schema: S, settings?: FolderSettings): SchemaToValues<S>

/**
 * Main hook of Leva. Pass an optional name and an input schema. Uses the global
 * store.
 *
 * @param nameOrSchema
 * @param schema
 * @param settings
 */
export function useControls<S extends Schema>(
  nameOrSchema: string | S,
  schemaOrSettings?: S | HookSettings,
  settingsOrUndefined?: FolderSettings
): SchemaToValues<S> {
  const values = useRootControls(globalStore, nameOrSchema, schemaOrSettings, settingsOrUndefined)
  // Renders <Leva /> only if it's not manually rendered by the user
  useRenderRoot()

  return values as any
}
