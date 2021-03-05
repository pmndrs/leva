import React from 'react'
import { ValueInput } from '../ValueInput'
import { Label, Row } from '../UI'
import { useInputContext } from '../../context'
import { StringProps } from './string-types'

export function StringComponent() {
  const { label, displayValue, onUpdate, onChange } = useInputContext<StringProps>()
  return (
    <Row input>
      <Label>{label}</Label>
      <ValueInput value={displayValue} onUpdate={onUpdate} onChange={onChange} />
    </Row>
  )
}
