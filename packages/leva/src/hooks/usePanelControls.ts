import { useStoreContext } from '../context'
import { useRootControls, HookSettings, SchemaOrFn, HookReturnType } from './useRootControls'
import { Schema } from '../types'

export function usePanelControls<S extends Schema, F extends SchemaOrFn<S>>(
  schema: F,
  settings?: HookSettings
): HookReturnType<F>
export function usePanelControls<S extends Schema, F extends SchemaOrFn<S>>(
  folderName: string,
  schema: F
): HookReturnType<F>

/**
 * Behaves like the main hook but uses its own store.
 *
 */
export function usePanelControls(nameOrSchema: any, schemaOrSettings?: any) {
  const store = useStoreContext()
  const values = useRootControls(store, nameOrSchema, schemaOrSettings)
  return values as any
}
