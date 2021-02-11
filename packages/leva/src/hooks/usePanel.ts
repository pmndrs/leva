import { useMemo } from 'react'
import { Store } from '../store'
import { useRootControls, SchemaOrFn } from './useRootControls'
import { Schema } from '../types'

/**
 * Behaves like the main hook but uses its own store.
 *
 */
export function usePanel<S extends Schema, F extends SchemaOrFn<S>>(nameOrSchema: string | F, schemaOrUndefined?: F) {
  const store = useMemo(() => new Store(), [])
  // the true flag indicates that we want the hook to return the set function and the store
  return useRootControls(store, nameOrSchema, schemaOrUndefined, true)
}
