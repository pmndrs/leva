import { dequal } from 'dequal/lite'
import { useState, useCallback, useEffect, useRef } from 'react'
import { format } from '../plugin'

type Props<V, Settings> = {
  type: string
  value: V
  settings?: Settings
  setValue: (v: V) => void
}

/**
 * A hook that manages input state, formatting, and updates for Leva input controls.
 *
 * @public - For plugin development
 *
 * This hook separates the display value (formatted for UI) from the actual value,
 * automatically syncs them when the value changes, and provides callbacks for
 * temporary changes (onChange) and committed changes (onUpdate). It also handles
 * sanitization errors by reverting to the previous valid value.
 *
 * @param props - Configuration object
 * @param props.type - The input type (e.g., 'NUMBER', 'STRING', 'COLOR')
 * @param props.value - The current value of the input
 * @param props.settings - Input settings (min, max, step, etc.)
 * @param props.setValue - Callback to update the actual value
 * @returns An object containing:
 *   - `displayValue`: The formatted value to display in the UI
 *   - `onChange`: Update the display value (for temporary changes like dragging)
 *   - `onUpdate`: Commit the value change (validates and calls setValue)
 *
 * @example
 * // Used internally in ControlInput to render any input type
 * function ControlInput({ type, value, settings, setValue }) {
 *   const { displayValue, onChange, onUpdate } = useInputSetters({
 *     type,
 *     value,
 *     settings,
 *     setValue
 *   })
 *
 *   const Input = Plugins[type].component
 *   return (
 *     <Input
 *       value={value}
 *       displayValue={displayValue}
 *       onChange={onChange}
 *       onUpdate={onUpdate}
 *       settings={settings}
 *     />
 *   )
 * }
 *
 * @example
 * // Used in Vector input to manage each coordinate independently
 * function Coordinate({ value, valueKey, settings, onUpdate }) {
 *   const setValue = useCallback(
 *     (newValue) => onUpdate({ [valueKey]: newValue }),
 *     [onUpdate, valueKey]
 *   )
 *
 *   const number = useInputSetters({
 *     type: 'NUMBER',
 *     value: value[valueKey],
 *     settings,
 *     setValue
 *   })
 *
 *   return (
 *     <Number
 *       displayValue={number.displayValue}
 *       onChange={number.onChange}  // Updates display while dragging
 *       onUpdate={number.onUpdate}  // Commits the final value
 *       settings={settings}
 *     />
 *   )
 * }
 *
 * @example
 * // Custom input with error handling
 * function CustomInput({ value, type, settings }) {
 *   const setValue = useCallback((newValue) => {
 *     // This might throw a LEVA_ERROR if validation fails
 *     if (newValue < 0) {
 *       const error = new Error('Value must be positive')
 *       error.type = 'LEVA_ERROR'
 *       error.previousValue = value
 *       throw error
 *     }
 *     updateStore(newValue)
 *   }, [value])
 *
 *   const { displayValue, onChange, onUpdate } = useInputSetters({
 *     type,
 *     value,
 *     settings,
 *     setValue
 *   })
 *
 *   // If onUpdate throws a LEVA_ERROR, displayValue automatically reverts
 *   return <input value={displayValue} onChange={onChange} onBlur={onUpdate} />
 * }
 */
export function useInputSetters<V, Settings extends object>({ value, type, settings, setValue }: Props<V, Settings>) {
  // the value used by the panel vs the value
  const [displayValue, setDisplayValue] = useState(format(type, value, settings))
  const previousValueRef = useRef(value)
  const settingsRef = useRef(settings)
  settingsRef.current = settings
  const setFormat = useCallback((v: V) => setDisplayValue(format(type, v, settingsRef.current)), [type])

  const onUpdate = useCallback(
    (updatedValue: any) => {
      try {
        setValue(updatedValue)
      } catch (error: any) {
        const { type, previousValue } = error
        // make sure we throw an error if it's not a sanitization error
        if (type !== 'LEVA_ERROR') throw error
        setFormat(previousValue)
      }
    },
    [setFormat, setValue]
  )

  useEffect(() => {
    if (!dequal(value, previousValueRef.current)) {
      setFormat(value)
    }
    previousValueRef.current = value
  }, [value, setFormat])

  return { displayValue, onChange: setDisplayValue, onUpdate }
}
