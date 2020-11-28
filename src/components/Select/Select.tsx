import React from 'react'
import { TwixInputProps } from '../../types'
import { Label, Row } from '../styles'
import { InternalSelectSettings } from './select-props'
import { StyledSelect } from './StyledSelect'

type SelectProps = TwixInputProps<any, InternalSelectSettings>

export function Select({ label, displayValue, onUpdate, settings }: SelectProps) {
  const { keys, values } = settings!
  return (
    <Row input>
      <Label>{label}</Label>
      <StyledSelect value={displayValue} onChange={e => onUpdate(values[+e.target.value])}>
        {keys.map((key, index) => (
          <option key={key} value={index}>
            {key}
          </option>
        ))}
      </StyledSelect>
    </Row>
  )
}
