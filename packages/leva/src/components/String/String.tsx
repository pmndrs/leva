import React from 'react'
import { ValueInput } from '../ValueInput'
import { LevaInputProps } from '../../types/'
import { Label, Row } from '../UI'

export function StringComponent({ value, valueKey, label, displayValue, onUpdate, onChange }: LevaInputProps<string>) {
  return (
    <Row input>
      <Label value={value} valueKey={valueKey}>
        {label}
      </Label>
      <ValueInput value={displayValue} onUpdate={onUpdate} onChange={onChange} />
    </Row>
  )
}
