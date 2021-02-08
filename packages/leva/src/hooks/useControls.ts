import { globalStore } from '../store'
import { useRootControls, HookSettings } from './useRootControls'
import { useRenderRoot } from '../components/Leva'
import { Schema, SchemaToValues } from '../types'

export function useControls<S extends Schema>(schema: S, settings?: HookSettings): SchemaToValues<S>
export function useControls<S extends Schema>(name: string, schema: S): SchemaToValues<S>

/**
 * Main hook of Leva. Pass an optional name and an input schema. Uses the global
 * store.
 *
 * @param nameOrSchema
 * @param schema
 * @param settings
 */
export function useControls(nameOrSchema: any, schemaOrSettings?: any) {
  const values = useRootControls(globalStore, nameOrSchema, schemaOrSettings)
  // Renders <Leva /> only if it's not manually rendered by the user
  useRenderRoot()

  return values as any
}
