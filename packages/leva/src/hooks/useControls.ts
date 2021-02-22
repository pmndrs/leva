import { globalStore } from '../store'
import { useRootControls, SchemaOrFn, DepsCompare } from './useRootControls'
import { useRenderRoot } from '../components/Leva'
import { FolderSettings, Schema } from '../types'

/**
 * Main hook of Leva. Pass an optional name and an input schema. Uses the global
 * store.
 *
 * @param nameOrSchema
 * @param schema
 * @param settings
 */
export function useControls<S extends Schema, F extends SchemaOrFn<S>>(
  nameOrSchema: string | F,
  schemaOrDeps?: F | DepsCompare,
  folderSettingsOrDeps?: FolderSettings | DepsCompare,
  depsOrUndefined?: DepsCompare
) {
  // Renders <Leva /> only if it's not manually rendered by the user
  useRenderRoot()
  return useRootControls(globalStore, nameOrSchema, schemaOrDeps, folderSettingsOrDeps, depsOrUndefined)
}
