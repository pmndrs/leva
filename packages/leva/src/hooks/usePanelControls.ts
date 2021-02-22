import { useRootControls, SchemaOrFn } from './useRootControls'
import { useStoreContext } from '../context'
import { FolderSettings, Schema } from '../types'

/**
 * Behaves like the main hook but uses its own store.
 *
 */
export function usePanelControls<S extends Schema, F extends SchemaOrFn<S>>(
  nameOrSchema: string | F,
  schemaOrDeps?: F | React.DependencyList,
  folderSettingsOrDeps?: FolderSettings | React.DependencyList,
  depsOrUndefined?: React.DependencyList
) {
  const store = useStoreContext()
  // the true flag indicates that we want the hook to return the set function and the store
  return useRootControls(store, nameOrSchema, schemaOrDeps, folderSettingsOrDeps, depsOrUndefined)
}
