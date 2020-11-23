import { useState, useCallback, useRef } from 'react'
import { Plugins } from '../register'
import { useDeepMemo } from './useDeepMemo'
import { dequal } from 'dequal'

function sanitize<V, Settings extends object>(type: string, value: any, settings?: Settings): V {
  const { sanitizer } = Plugins[type]
  if (sanitizer) return sanitizer(value, settings)
  return value
}

function format<Settings extends object>(type: string, value: unknown, settings?: Settings): string {
  const { formatter } = Plugins[type]
  if (formatter) return formatter(value, settings)
  return value as string
}

function validate<Settings extends object>(type: string, value: any, settings?: Settings) {
  const { validator } = Plugins[type]
  if (validator) return validator(value, settings)
  return true
}

export function normalizeSettings<V, Settings extends object>(type: string, value: V, settings?: Settings) {
  const { normalizeSettings } = Plugins[type]
  if (normalizeSettings) return normalizeSettings(value, settings)
  return settings
}

type Props<V, Settings> = {
  type: string
  value: V
  settings?: Settings
  set: (v: V) => void
}

export function useTwixUpdate<V, Settings extends object>({ value, type, settings, set }: Props<V, Settings>) {
  // the last correct registered value
  const lastCorrectValue = useRef(value)
  const initialValue = useRef(value)

  // TODO fix rerender shallow compare settings
  const _settings = useDeepMemo(() => normalizeSettings(type, initialValue.current, settings), [settings, type])

  // the value shown by the panel
  const [_value, _setValue] = useState(format(type, value, _settings))
  const setFormat = useCallback(value => _setValue(format(type, value, _settings)), [type, _settings])

  const onUpdate = useCallback(
    value => {
      // if new value is equivalent to previous value do nothing
      if (dequal(value, lastCorrectValue.current)) return

      if (value !== '' && validate(type, value, _settings)) {
        value = sanitize(type, value, _settings)
        setFormat(value)
        set(value)
        lastCorrectValue.current = value
      } else setFormat(lastCorrectValue.current)
    },
    [type, _settings, setFormat, set]
  )

  return {
    formattedValue: _value,
    onChange: _setValue,
    onUpdate,
    settings: _settings,
  }
}
