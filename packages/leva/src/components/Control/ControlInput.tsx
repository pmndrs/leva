import React from 'react'
import { Plugins } from '../../plugin'
import { warn, LevaErrors } from '../../utils/log'
import { InputContext } from '../../context'
import { useInputSetters } from '../../hooks'
import { StyledInputWrapper } from '../UI/StyledUI'

type ControlInputProps<V, Settings extends object> = {
  type: string
  label: string
  valueKey: string
  path: string
  value: V
  settings: Settings
  disabled: boolean
  setValue: (value: any) => void
  setSettings: (settings: any) => void
  optional: boolean
  hint?: string
  disable: (flag: boolean) => void
}

export function ControlInput<V, Settings extends object>({
  type,
  label,
  path,
  valueKey,
  value,
  settings,
  setValue,
  disabled,
  ...rest
}: ControlInputProps<V, Settings>) {
  const { displayValue, onChange, onUpdate } = useInputSetters({ type, value, settings, setValue })

  const Input = Plugins[type].component
  if (!Input) {
    warn(LevaErrors.NO_COMPONENT_FOR_TYPE, type, path)
    return null
  }

  return (
    <InputContext.Provider
      value={{
        key: valueKey,
        path,
        id: 'leva__' + path,
        label,
        displayValue,
        value,
        onChange,
        onUpdate,
        settings,
        setValue,
        disabled,
        ...rest,
      }}>
      <StyledInputWrapper disabled={disabled}>
        <Input />
      </StyledInputWrapper>
    </InputContext.Provider>
  )
}
