import React from 'react'
import { LevaInputProps } from '../../types/'
import { useInputContext } from '../../context'
import { Label, Row } from '../UI'
import { StyledInputWrapper } from './StyledBoolean'

export function Boolean() {
  const { label, value, onUpdate } = useInputContext<LevaInputProps<boolean>>()

  // htmlFor might raise a conflict if two booleans are labeled the same way
  return (
    <Row input>
      <Label htmlFor={label}>{label}</Label>
      <StyledInputWrapper>
        <input id={label} type="checkbox" checked={value} onChange={e => onUpdate(e.target.checked)} />
        <label htmlFor={label} />
      </StyledInputWrapper>
    </Row>
  )
}
