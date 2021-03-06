import React from 'react'
import { ValueInput } from '../ValueInput'
import { Label, Row } from '../UI'
import { useInputContext } from '../../context'
import type { StringProps } from './string-types'

export function String({
  displayValue,
  onUpdate,
  onChange,
}: Pick<StringProps, 'displayValue' | 'onUpdate' | 'onChange'>) {
  return <ValueInput value={displayValue} onUpdate={onUpdate} onChange={onChange} />
}

export function StringComponent() {
  const { label, displayValue, onUpdate, onChange } = useInputContext<StringProps>()
  return (
    <Row input>
      <Label>{label}</Label>
      <String displayValue={displayValue} onUpdate={onUpdate} onChange={onChange} />
    </Row>
  )
}
