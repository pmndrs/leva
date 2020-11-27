import React from 'react'
import { ValueInput } from '../ValueInput'
import { TwixInputProps } from '../../types'
import { Label, Row } from '../styles'

export function String({ label, displayedValue, onUpdate, onChange }: TwixInputProps<string>) {
  return (
    <Row input>
      <Label>{label}</Label>
      <ValueInput value={displayedValue} onUpdate={onUpdate} onChange={onChange} />
    </Row>
  )
}
