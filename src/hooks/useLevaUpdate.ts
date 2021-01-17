import { useState, useCallback, useEffect, useRef } from 'react'
import { Plugins } from '../register'
import { dequal } from 'dequal'

function sanitize<Settings extends object>(type: string, value: any, settings?: Settings) {
  const { sanitize } = Plugins[type]
  if (sanitize) return sanitize(value, settings)
  return value
}

function format<Settings extends object>(type: string, value: any, settings?: Settings) {
  const { format } = Plugins[type]
  if (format) return format(value, settings)
  return value
}

function validate<Settings extends object>(type: string, value: any, settings?: Settings) {
  const { validate } = Plugins[type]
  if (validate) return validate(value, settings)
  return true
}

type Props<V, Settings> = {
  type: string
  value: V
  settings?: Settings
  set: (v: V) => void
}

export function useLevaUpdate<V, Settings extends object>({ value, type, settings, set }: Props<V, Settings>) {
  // the last correct registered value
  const lastCorrectValue = useRef(value)

  // the value used by the panel vs the value
  const [_value, _setValue] = useState(format(type, value, settings))
  const setFormat = useCallback(v => _setValue(format(type, v, settings)), [type, settings])

  const onUpdate = useCallback(
    (displayValueOrFn: ((v: V) => any) | any) => {
      const displayValue =
        typeof displayValueOrFn === 'function' ? displayValueOrFn(lastCorrectValue.current) : displayValueOrFn

      if (!validate(type, displayValue, settings)) {
        setFormat(lastCorrectValue.current)
        return
      }
      const newValue = sanitize(type, displayValue, settings)

      /**
       * @note I had to remove the check as sometimes the sanitized value
       * doesn't match the input value. For example, if the minimum value of
       * a number is 30, and the user inputs 15. Then the newValue will be sanitized
       * to 30 and subsequent calls like 14, 0, etc. won't result in a render.
       */
      // if new value is equivalent to previous value do nothing
      // if (dequal(newValue, lastCorrectValue.current)) return

      lastCorrectValue.current = newValue

      setFormat(newValue)
      set(newValue)
    },
    [type, settings, setFormat, set]
  )

  useEffect(() => {
    if (!dequal(value, lastCorrectValue.current)) {
      lastCorrectValue.current = value
      setFormat(value)
    }
  }, [value, setFormat])

  return { displayValue: _value, onChange: _setValue, onUpdate, valueRef: lastCorrectValue }
}
