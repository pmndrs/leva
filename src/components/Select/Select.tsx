import React from 'react'
import { LevaInputProps } from '../../types/'
import { useInputContext } from '../../context'
import { Label, Row } from '../UI'
import { InternalSelectSettings } from './select-plugin'
import { StyledSelect } from './StyledSelect'

type SelectProps = LevaInputProps<any, InternalSelectSettings>

export function Select() {
  const { label, displayValue, onUpdate, settings } = useInputContext<SelectProps>()
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
