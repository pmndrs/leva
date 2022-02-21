import React from 'react'
import { useInputContext } from '../../context'
import { Label, Row } from '../UI'
import { StyledInputWrapper } from './StyledBoolean'
import type { BooleanProps } from './boolean-types'

export function Boolean({
  value,
  onUpdate,
  id,
  disabled,
}: Pick<BooleanProps, 'value' | 'onUpdate' | 'id' | 'disabled'>) {
  return (
    <StyledInputWrapper>
      <input
        id={id}
        type="checkbox"
        checked={value}
        onChange={(e) => onUpdate(e.currentTarget.checked)}
        disabled={disabled}
      />
      <label htmlFor={id}>
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
        </svg>
      </label>
    </StyledInputWrapper>
  )
}

export function BooleanComponent() {
  const { label, value, onUpdate, disabled, id } = useInputContext<BooleanProps>()

  return (
    <Row input>
      <Label>{label}</Label>
      <Boolean value={value} onUpdate={onUpdate} id={id} disabled={disabled} />
    </Row>
  )
}
