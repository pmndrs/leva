import React from 'react'
import { ValueInput } from '../ValueInput'
import { TwixInputProps } from '../../types'
import { Label, Row } from '../styles'

export function String({ label, formattedValue, onUpdate, onChange }: TwixInputProps<string>) {
  return (
    <Row grid>
      <Label>{label}</Label>
      <ValueInput value={formattedValue} onUpdate={onUpdate} onChange={onChange} />
    </Row>
  )
}
