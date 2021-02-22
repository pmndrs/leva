import { useRootControls, SchemaOrFn, DepsCompare } from './useRootControls'
import { useStoreContext } from '../context'
import { FolderSettings, Schema } from '../types'

/**
 * Behaves like the main hook but uses its own store.
 *
 */
export function usePanelControls<S extends Schema, F extends SchemaOrFn<S>>(
  nameOrSchema: string | F,
  schemaOrDeps?: F | DepsCompare,
  folderSettingsOrDeps?: FolderSettings | DepsCompare,
  depsOrUndefined?: DepsCompare
) {
  const store = useStoreContext()
  // the true flag indicates that we want the hook to return the set function and the store
  return useRootControls(store, nameOrSchema, schemaOrDeps, folderSettingsOrDeps, depsOrUndefined)
}
