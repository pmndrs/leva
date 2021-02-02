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
        <label htmlFor={label}>
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
          </svg>
        </label>
      </StyledInputWrapper>
    </Row>
  )
}
