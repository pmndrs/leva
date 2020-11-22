import React from 'react'
import { ValueInput } from '../ValueInput'
import { TwixInputProps } from '../../types'

export function String({ label, formattedValue, onUpdate, onChange }: TwixInputProps<string>) {
  return (
    <>
      <label>{label}</label>
      <ValueInput label={label} value={formattedValue} onUpdate={onUpdate} onChange={onChange} />
    </>
  )
}
