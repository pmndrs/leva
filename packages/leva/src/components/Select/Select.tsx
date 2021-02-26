import React from 'react'
import { LevaInputProps } from '../../types/'
import { useInputContext } from '../../context'
import { Label, Row, Chevron } from '../UI'
import { InternalSelectSettings } from './select-plugin'
import { StyledSelect, SelectContainer } from './StyledSelect'

type SelectProps = LevaInputProps<any, InternalSelectSettings>

export function SelectComponent() {
  const { label, displayValue, onUpdate, path, settings } = useInputContext<SelectProps>()
  const { keys, values } = settings!
  return (
    <Row input>
      <Label>{label}</Label>
      <SelectContainer>
        <StyledSelect id={path} value={displayValue} onChange={(e) => onUpdate(values[+e.currentTarget.value])}>
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
