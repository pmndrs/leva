import React from 'react'
import { ValueInput } from '../ValueInput'
import { StringSettings } from '../../types'

type StringProps = {
  label: string
  formattedValue: string
  value: string
  onChange: (value: string) => void
  onUpdate: (value: string) => void
} & StringSettings

export function String({ label, formattedValue, onUpdate, onChange }: StringProps) {
  return (
    <>
      <label>{label}</label>
      <ValueInput label={label} value={formattedValue} onUpdate={onUpdate} onChange={onChange} />
    </>
  )
}
