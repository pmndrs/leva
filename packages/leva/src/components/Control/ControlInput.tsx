import React from 'react'
import { Plugins } from '../../plugin'
import { log, LevaErrors } from '../../utils/log'
import { InputContext } from '../../context'
import { useValue } from '../../hooks'
import { StyledInputWrapper } from '../UI/StyledUI'
import type { DataInput } from '../../types'

type ControlInputProps = Omit<DataInput, '__refCount' | 'key'> & {
  valueKey: string
  path: string
  setValue: (value: any) => void
  setSettings: (settings: any) => void
  disable: (flag: boolean) => void
}

export function ControlInput({
  type,
  label,
  path,
  valueKey,
  value,
  settings,
  setValue,
  disabled,
  ...rest
}: ControlInputProps) {
  const { displayValue, onChange, onUpdate } = useValue({ type, value, settings, setValue })

  const Input = Plugins[type].component
  if (!Input) {
    log(LevaErrors.NO_COMPONENT_FOR_TYPE, type, path)
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
