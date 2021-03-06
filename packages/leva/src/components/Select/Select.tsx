import React from 'react'
import { useInputContext } from '../../context'
import { Label, Row, Chevron } from '../UI'
import { StyledSelect, SelectContainer } from './StyledSelect'
import { SelectProps } from './select-types'

function Select({
  displayValue,
  onUpdate,
  id,
  settings,
}: Pick<SelectProps, 'displayValue' | 'onUpdate' | 'id' | 'settings'>) {
  const { keys, values } = settings!

  return (
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
  )
}

export function SelectComponent() {
  const { label, displayValue, onUpdate, id, settings } = useInputContext<SelectProps>()
  return (
    <Row input>
      <Label>{label}</Label>
      <Select id={id} displayValue={displayValue} onUpdate={onUpdate} settings={settings} />
    </Row>
  )
}
