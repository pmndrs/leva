import shallow from 'zustand/shallow'
import { useStoreContext } from '../context'

/**
 * A hook that subscribes to and returns the value of a single input at the given path.
 *
 * @public - For plugin development
 *
 * This is a lightweight alternative to `useInput` when you only need the value,
 * not the full input metadata (type, settings, label) or store methods (set, setSettings).
 * The component will re-render whenever the value at the path changes.
 *
 * @param path - The dot-separated path to the input in the store (e.g., "myFolder.myInput")
 * @returns The current value of the input at the path
 *
 * @example
 * // Simple value subscription
 * function MyComponent() {
 *   const count = useValue('count')
 *
 *   return <div>Current count: {count}</div>
 * }
 *
 * @example
 * // Using value in calculations
 * function ScaledDisplay() {
 *   const scale = useValue('settings.scale')
 *   const size = useValue('settings.size')
 *
 *   return <div style={{ transform: `scale(${scale})`, width: size }}>Content</div>
 * }
 *
 * @example
 * // Read-only display component
 * function StatusDisplay() {
 *   const status = useValue('app.status')
 *   const progress = useValue('app.progress')
 *
 *   return (
 *     <div>
 *       <p>Status: {status}</p>
 *       <progress value={progress} max={100} />
 *     </div>
 *   )
 * }
 */
export const useValue = (path: string) => {
  return useValues([path])[path]
}

/**
 * A hook that subscribes to and returns the values of multiple inputs at the given paths.
 *
 * @public - For plugin development
 *
 * This is more efficient than calling `useValue` multiple times because it batches
 * the subscriptions and reduces unnecessary re-renders using shallow comparison.
 * Only re-renders when any of the specified values change.
 *
 * @param paths - Array of dot-separated paths to inputs in the store
 * @returns An object mapping each path to its current value
 *
 * @example
 * // Subscribe to multiple related values efficiently
 * function PlayerStats() {
 *   const { health, mana, stamina } = useValues(['player.health', 'player.mana', 'player.stamina'])
 *
 *   return (
 *     <div>
 *       <div>Health: {health}</div>
 *       <div>Mana: {mana}</div>
 *       <div>Stamina: {stamina}</div>
 *     </div>
 *   )
 * }
 *
 * @example
 * // Dynamic paths with type safety
 * function ConfigDisplay<T extends string>(props: { keys: T[] }) {
 *   const values = useValues(props.keys)
 *   // values is typed as { [key in T]: any }
 *
 *   return (
 *     <ul>
 *       {props.keys.map(key => (
 *         <li key={key}>{key}: {JSON.stringify(values[key])}</li>
 *       ))}
 *     </ul>
 *   )
 * }
 *
 * @example
 * // Combine multiple values for derived state
 * function BoundingBox() {
 *   const { x, y, width, height } = useValues(['box.x', 'box.y', 'box.width', 'box.height'])
 *
 *   return (
 *     <div style={{
 *       position: 'absolute',
 *       left: x,
 *       top: y,
 *       width,
 *       height,
 *       border: '2px solid red'
 *     }} />
 *   )
 * }
 */
export const useValues = <T extends string>(paths: T[]) => {
  const store = useStoreContext()
  const value = store.useStore(
    ({ data }) =>
      paths.reduce((acc, path) => {
        if (data[path] && 'value' in data[path]) return Object.assign(acc, { [path]: data[path].value })
        return acc
      }, {} as { [key in T]: any }),
    shallow
  )
  return value
}
