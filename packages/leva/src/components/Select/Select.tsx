import React from 'react'
import { useInputContext } from '../../context'
import { Label, Row, Chevron } from '../UI'
import { NativeSelect, PresentationalSelect, SelectContainer } from './StyledSelect'
import type { SelectProps } from './select-types'

function Select({
  displayValue,
  onUpdate,
  id,
  settings,
}: Pick<SelectProps, 'displayValue' | 'onUpdate' | 'id' | 'settings'>) {
  const { keys } = settings!

  return (
    <SelectContainer>
      <NativeSelect id={id} value={displayValue} onChange={(e) => onUpdate(e.currentTarget.value)}>
        {keys.map((key) => (
          <option key={key} value={key}>
            {key}
          </option>
        ))}
      </NativeSelect>
      <PresentationalSelect>{displayValue}</PresentationalSelect>
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
