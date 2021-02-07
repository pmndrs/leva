import { globalStore } from '../store'
import { useRootControls, Settings } from './useRootControls'
import { useRenderRoot } from '../components/Leva'
import { Schema, SchemaToValues } from '../types'

export function useControls<S extends Schema>(schema: S): SchemaToValues<S>
export function useControls<S extends Schema>(name: string, schema: S, settings?: Settings): SchemaToValues<S>

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
  schema?: S,
  settings?: Settings
): SchemaToValues<S> {
  const values = useRootControls(globalStore, nameOrSchema, schema, settings)
  // Renders <Leva /> only if it's not manually rendered by the user
  useRenderRoot()

  return values as any
}
