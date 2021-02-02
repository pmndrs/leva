import React from 'react'
import { ValueInput } from '../ValueInput'
import { LevaInputProps } from '../../types/'
import { Label, Row } from '../UI'
import { useInputContext } from '../../hooks'

export function StringComponent() {
  const { label, displayValue, onUpdate, onChange } = useInputContext<LevaInputProps<string>>()
  return (
    <Row input>
      <Label>{label}</Label>
      <ValueInput value={displayValue} onUpdate={onUpdate} onChange={onChange} />
    </Row>
  )
}
