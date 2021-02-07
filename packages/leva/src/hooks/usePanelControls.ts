import { useStoreContext } from '../context'
import { useRootControls, Settings } from './useRootControls'
import { Schema, SchemaToValues } from '../types'

export function usePanelControls<S extends Schema>(schema: S): SchemaToValues<S>
export function usePanelControls<S extends Schema>(name: string, schema: S, settings?: Settings): SchemaToValues<S>

/**
 * Behaves like the main hook but uses its own store.
 *
 */
export function usePanelControls<S extends Schema>(
  nameOrSchema: string | S,
  schema?: S,
  settings?: Settings
): SchemaToValues<S> {
  const store = useStoreContext()
  const values = useRootControls(store, nameOrSchema, schema, settings)
  return values as any
}
