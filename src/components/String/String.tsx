import React from 'react'
import { ValueInput } from '../ValueInput'
import { LevaInputProps } from '../../types/'
import { Label, Row } from '../styles'

export function String({ label, displayValue, onUpdate, onChange }: LevaInputProps<string>) {
  return (
    <Row input>
      <Label>{label}</Label>
      <ValueInput value={displayValue} onUpdate={onUpdate} onChange={onChange} />
    </Row>
  )
}
