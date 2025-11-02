import shallow from 'zustand/shallow'
import { getValuesForPaths } from '../utils/data'
import type { Data, StoreType } from '../types'

/**
 * A hook that subscribes to and returns flattened values from the store for the given paths.
 *
 * @internal - Used by useControls
 *
 * This is an internal hook primarily used by `useControls` to transform the nested store structure
 * into a flat object with shortened keys. It merges initial data (returned on first render) with
 * live store data, and uses shallow comparison to prevent unnecessary re-renders.
 *
 * Key features:
 * - Flattens nested paths: `{ "folder.subfolder.valueKey": value }` → `{ valueKey: value }`
 * - Returns `initialData` on first render (before store is initialized)
 * - Filters out disabled inputs (returns `undefined` for disabled values)
 * - Uses shallow equality for efficient re-render prevention
 *
 * @param store - The Leva store instance to subscribe to
 * @param paths - Array of full dot-separated paths to extract from the store
 * @param initialData - Initial data to return on first render (before store initialization)
 * @returns An object with flattened keys (last segment of path) mapped to their values
 *
 * @example
 * // Internal usage in useControls
 * function useControls(schema) {
 *   const store = useStoreContext()
 *
 *   // Parse schema to get paths and initial values
 *   const allPaths = ['position.x', 'position.y', 'settings.speed']
 *   const initialData = {
 *     'position.x': { key: 'x', value: 0, type: 'NUMBER' },
 *     'position.y': { key: 'y', value: 0, type: 'NUMBER' },
 *     'settings.speed': { key: 'speed', value: 1, type: 'NUMBER' }
 *   }
 *
 *   // Returns: { x: 0, y: 0, speed: 1 } (flattened)
 *   const values = useValuesForPath(store, allPaths, initialData)
 *
 *   return values
 * }
 *
 * @example
 * // How it handles nested structures
 * function Example() {
 *   const paths = ['camera.position.x', 'camera.rotation.y', 'light.intensity']
 *   const initialData = {
 *     'camera.position.x': { key: 'x', value: 10, disabled: false },
 *     'camera.rotation.y': { key: 'y', value: 0, disabled: false },
 *     'light.intensity': { key: 'intensity', value: 1, disabled: true }
 *   }
 *
 *   // Returns: { x: 10, y: 0, intensity: undefined }
 *   // Note: disabled inputs return undefined
 *   const values = useValuesForPath(store, paths, initialData)
 * }
 *
 * @example
 * // First render vs subsequent renders
 * function RenderBehavior() {
 *   const initialData = { 'myInput': { key: 'myInput', value: 'initial' } }
 *
 *   // First render: returns values from initialData
 *   // Subsequent renders: returns values from store.data (reactive)
 *   const values = useValuesForPath(store, ['myInput'], initialData)
 *
 *   // This ensures useControls can return values immediately,
 *   // even before the store is fully initialized in useEffect
 * }
 */
export function useValuesForPath(store: StoreType, paths: string[], initialData: Data) {
  const valuesForPath = store.useStore((s) => {
    const data = { ...initialData, ...s.data }
    return getValuesForPaths(data, paths)
  }, shallow)

  return valuesForPath
}
