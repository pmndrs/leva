import React from 'react'
import { Plugins } from '../../plugin'
import { InputContext } from '../../context'
import { useValue } from '../../hooks'

type ControlInputProps<V, Settings extends object> = {
  type: string
  label: string
  valueKey: string
  path: string
  value: V
  settings: Settings
  setValue: (value: any) => void
}

export function ControlInput<V, Settings extends object>({
  type,
  label,
  path,
  valueKey,
  value,
  settings,
  setValue,
}: ControlInputProps<V, Settings>) {
  const { displayValue, onChange, onUpdate } = useValue({ type, value, settings, setValue })
  const Input = Plugins[type].component

  return (
    <InputContext.Provider value={{ key: valueKey, path, label, displayValue, value, onChange, onUpdate, settings }}>
      <Input />
    </InputContext.Provider>
  )
}
