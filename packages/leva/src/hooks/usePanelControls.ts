import { useStoreContext } from '../context'
import { useRootControls, HookSettings } from './useRootControls'
import { Schema, SchemaToValues } from '../types'

export function usePanelControls<S extends Schema>(schema: S, settings?: HookSettings): SchemaToValues<S>
export function usePanelControls<S extends Schema>(folderName: string, schema: S): SchemaToValues<S>

/**
 * Behaves like the main hook but uses its own store.
 *
 */
export function usePanelControls(nameOrSchema: any, schemaOrSettings?: any) {
  const store = useStoreContext()
  const values = useRootControls(store, nameOrSchema, schemaOrSettings)
  return values as any
}
