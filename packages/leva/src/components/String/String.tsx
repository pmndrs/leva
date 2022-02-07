import React from 'react'
import { ValueInput, ValueInputProps } from '../ValueInput'
import { Label, Row } from '../UI'
import { useInputContext } from '../../context'
import type { StringProps } from './string-types'
import { styled } from '../../styles'

type BaseStringProps = Pick<StringProps, 'displayValue' | 'onUpdate' | 'onChange'> &
  Omit<ValueInputProps, 'value'> & { editable?: boolean }

const NonEditableString = styled('div', {
  whiteSpace: 'pre-wrap',
})

export function String({ displayValue, onUpdate, onChange, editable = true, ...props }: BaseStringProps) {
  if (editable) return <ValueInput value={displayValue} onUpdate={onUpdate} onChange={onChange} {...props} />
  return <NonEditableString>{displayValue}</NonEditableString>
}

export function StringComponent() {
  const { label, settings, displayValue, onUpdate, onChange } = useInputContext<StringProps>()
  return (
    <Row input>
      <Label>{label}</Label>
      <String displayValue={displayValue} onUpdate={onUpdate} onChange={onChange} {...settings} />
    </Row>
  )
}
