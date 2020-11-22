import { useState, useCallback, useRef } from 'react'
import { Plugins } from '../register'
import { Settings, Value } from '../types'

function sanitize(type: string, value: any, settings: Settings): Value {
  const { sanitizer } = Plugins[type]
  if (sanitizer) return sanitizer(value, settings)
  return value
}

function format(type: string, value: Value, settings: Settings): string {
  const { formatter } = Plugins[type]
  if (formatter) return formatter(value, settings)
  return value as string
}

function validate(type: string, value: any, settings: Settings) {
  const { validator } = Plugins[type]
  if (validator) return validator(value, settings)
  return true
}

type Props = {
  type: string
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
