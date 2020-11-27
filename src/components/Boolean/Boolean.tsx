import React from 'react'
import { TwixInputProps } from '../../types'
import { Label, Row } from '../styles'
import { StyledInputWrapper } from './StyledBoolean'

export function Boolean({ label, value, onUpdate }: TwixInputProps<boolean>) {
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
