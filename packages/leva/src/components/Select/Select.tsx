import React from 'react'
import { useInputContext } from '../../context'
import { Label, Row, Chevron } from '../UI'
import { StyledSelect, SelectContainer } from './StyledSelect'
import { SelectProps } from './select-types'

export function SelectComponent() {
  const { label, displayValue, onUpdate, id, settings } = useInputContext<SelectProps>()
  const { keys, values } = settings!
  return (
    <Row input>
      <Label>{label}</Label>
      <SelectContainer>
        <StyledSelect id={id} value={displayValue} onChange={(e) => onUpdate(values[+e.currentTarget.value])}>
          {keys.map((key, index) => (
            <option key={key} value={index}>
              {key}
            </option>
          ))}
        </StyledSelect>
        <Chevron toggled />
      </SelectContainer>
    </Row>
  )
}
