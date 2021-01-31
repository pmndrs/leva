import React from 'react'
import { LevaInputProps } from '../../types/'
import { useInputContext } from '../../hooks'
import { Label, Row } from '../UI'
import { StyledInputWrapper } from './StyledBoolean'

export function Boolean() {
  const { label, value, onUpdate } = useInputContext<LevaInputProps<boolean>>()

  return (
    <Row input>
      <Label>{label}</Label>
      <StyledInputWrapper>
        <input id={label} type="checkbox" checked={value} onChange={(e) => onUpdate(e.currentTarget.checked)} />
        <label htmlFor={label} />
      </StyledInputWrapper>
    </Row>
  )
}
