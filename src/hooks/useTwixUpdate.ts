import { useState, useCallback, useRef } from 'react'
import { Plugins } from '../register'
import { Settings, Value, ValueInputTypes } from '../types'

function sanitize(type: ValueInputTypes, value: any, settings: Settings): Value {
  // @ts-ignore don't understand why this triggers an error
  const { sanitizer } = Plugins[type]
  if (sanitizer) return sanitizer(value, settings)
  return value
}

function format(type: ValueInputTypes, value: Value, settings: Settings): string {
  // @ts-ignore don't understand why this triggers an error
  const { formatter } = Plugins[type]
  if (formatter) return formatter(value, settings)
  return value as string
}

function validate(type: ValueInputTypes, value: any, settings: Settings) {
  // @ts-ignore don't understand why this triggers an error
  const { validator } = Plugins[type]
  if (validator) return validator(value, settings)
  return true
}

type Props = {
  type: ValueInputTypes
  value: Value
  settings: Settings
  set: (v: Value) => void
}

export function useTwixUpdate({ value, type, settings, set }: Props) {
  // the last correct registered value
  const lastCorrectValue = useRef(value)

  // the value shown by the panel
  const [_value, _setValue] = useState(format(type, value, settings))
  const onChange = useCallback(value => _setValue(format(type, value, settings)), [type, settings])

  const onUpdate = useCallback(
    value => {
      if (value !== '' && validate(type, value, settings)) {
        value = sanitize(type, value, settings)
        onChange(value)
        set(value)
        lastCorrectValue.current = value
      } else onChange(lastCorrectValue.current)
    },
    [type, settings, onChange, set]
  )

  return [_value, onChange, onUpdate] as [string, (v: any) => void, (v: any) => void]
}
