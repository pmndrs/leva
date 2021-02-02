import React, { useCallback } from 'react'
import { InputContext } from '../../context'
import { useLevaUpdate } from '../../hooks/useLevaUpdate'
import { store } from '../../store'

type ControlInputProps<V, Settings extends object> = {
  as: React.ComponentType
  valueKey: string
  path: string
  type: string
  value: V
  settings: Settings
}

export function ControlInput<V, Settings extends object>({
  as: Input,
  valueKey,
  path,
  type,
  value,
  settings,
}: ControlInputProps<V, Settings>) {
  const set = useCallback((value) => store.setValueAtPath(path, value), [path])

  const { displayValue, onChange, onUpdate } = useLevaUpdate({ type, value, settings, set })

  return (
    <InputContext.Provider value={{ valueKey, label: valueKey, displayValue, value, onChange, onUpdate, settings }}>
      <Input />
    </InputContext.Provider>
  )
}
