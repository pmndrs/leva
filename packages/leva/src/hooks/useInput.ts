import { useCallback, useState, useEffect } from 'react'
import shallow from 'zustand/shallow'
import { useStoreContext } from '../context'
import type { Data, DataItem } from '../types'

const getInputAtPath = (data: Data, path: string) => {
  if (!data[path]) return null
  const { __refCount, ...input } = data[path]
  return input
}

type Input = Omit<DataItem, '__refCount'>

/**
 * A hook that subscribes to and returns all data for a specific input control at the given path.
 *
 * @public - For plugin development
 *
 * This hook is primarily used internally by Leva's Control component to render each input,
 * but it's also exposed in the public API for advanced use cases and custom plugin development.
 *
 * The hook automatically subscribes to store changes for the given path, so the component
 * will re-render whenever the input value or settings change.
 *
 * @param path - The dot-separated path to the input in the store (e.g., "myFolder.myInput")
 * @returns A tuple of [input, methods] where:
 *   - input: The input data (type, value, settings, label, etc.) or null if not found
 *   - methods: An object with functions to interact with the input:
 *     - `set`: Update the input's value
 *     - `setSettings`: Update the input's settings (min, max, step, etc.)
 *     - `disable`: Enable/disable the input
 *     - `storeId`: The ID of the store this input belongs to
 *     - `emitOnEditStart`: Trigger the onEditStart callback
 *     - `emitOnEditEnd`: Trigger the onEditEnd callback
 *
 * @example
 * // Internal usage in Control component
 * function Control({ path }) {
 *   const [input, { set, setSettings, disable, storeId, emitOnEditStart, emitOnEditEnd }] = useInput(path)
 *
 *   if (!input) return null
 *
 *   return (
 *     <ControlInput
 *       type={input.type}
 *       value={input.value}
 *       setValue={set}
 *       setSettings={setSettings}
 *       disabled={input.disabled}
 *       {...input}
 *     />
 *   )
 * }
 *
 * @example
 * // Custom component that displays and controls an input
 * function CustomNumberDisplay() {
 *   const [input, { set, disable }] = useInput('myNumber')
 *
 *   if (!input) return null
 *
 *   return (
 *     <div>
 *       <p>Current value: {input.value}</p>
 *       <button onClick={() => set(input.value + 1)}>Increment</button>
 *       <button onClick={() => disable(!input.disabled)}>
 *         {input.disabled ? 'Enable' : 'Disable'}
 *       </button>
 *     </div>
 *   )
 * }
 *
 * @example
 * // Dynamically updating settings based on another input
 * function DynamicRangeControl() {
 *   const [maxInput] = useInput('maxValue')
 *   const [rangeInput, { setSettings }] = useInput('range')
 *
 *   useEffect(() => {
 *     if (maxInput && rangeInput) {
 *       // Update range max when maxValue changes
 *       setSettings({ max: maxInput.value })
 *     }
 *   }, [maxInput?.value, rangeInput, setSettings])
 *
 *   return null
 * }
 */
export function useInput(path: string): [
  Input | null,
  {
    set: (value: any, onValueChanged?: (value: any) => void) => void
    setSettings: (value: any) => void
    disable: (flag: boolean) => void
    storeId: string
    emitOnEditStart: () => void
    emitOnEditEnd: () => void
  }
] {
  const store = useStoreContext()
  const [state, setState] = useState<Input | null>(getInputAtPath(store.getData(), path))

  const set = useCallback((value: any) => store.setValueAtPath(path, value, true), [path, store])
  const setSettings = useCallback((settings: any) => store.setSettingsAtPath(path, settings), [path, store])
  const disable = useCallback((flag: boolean) => store.disableInputAtPath(path, flag), [path, store])
  const emitOnEditStart = useCallback(() => store.emitOnEditStart(path), [path, store])
  const emitOnEditEnd = useCallback(() => store.emitOnEditEnd(path), [path, store])

  useEffect(() => {
    setState(getInputAtPath(store.getData(), path))
    const unsub = store.useStore.subscribe((s) => getInputAtPath(s.data, path), setState, { equalityFn: shallow })
    return () => unsub()
  }, [store, path])

  return [state, { set, setSettings, disable, storeId: store.storeId, emitOnEditStart, emitOnEditEnd }]
}
