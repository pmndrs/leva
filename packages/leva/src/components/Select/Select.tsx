import React from 'react'
import { LevaInputProps } from '../../types/'
import { Label, Row, Chevron } from '../UI'
import { InternalSelectSettings } from './select-plugin'
import { StyledSelect, SelectContainer } from './StyledSelect'

type SelectProps = LevaInputProps<any, InternalSelectSettings>

export function SelectComponent({ value, valueKey, label, displayValue, onUpdate, settings }: SelectProps) {
  const { keys, values } = settings!
  return (
    <Row input>
      <Label value={value} valueKey={valueKey}>
        {label}
      </Label>
      <SelectContainer>
        <StyledSelect value={displayValue} onChange={(e) => onUpdate(values[+e.currentTarget.value])}>
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
