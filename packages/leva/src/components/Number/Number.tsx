import React from 'react'
import { NumberInput } from '../ValueInput'
import { LevaInputProps } from '../../types/'
import { InternalNumberSettings } from './number-plugin'
import { Label, Row } from '../UI'
import { useDragNumber } from '../../utils/hooks'
import { RangeGrid, InnerNumberLabel } from './StyledNumber'
import { RangeSlider } from './RangeSlider'
import { useInputContext } from '../../context'

type NumberProps = LevaInputProps<number, InternalNumberSettings>

export function Number({ label, displayValue, onUpdate, onChange, settings }: NumberProps) {
  const bind = useDragNumber({ settings, onDrag: onUpdate })
  return (
    <NumberInput value={displayValue} onUpdate={onUpdate} onChange={onChange}>
      <InnerNumberLabel title={label.length > 1 ? label : ''} {...bind()}>
        {label.charAt(0)}
      </InnerNumberLabel>
    </NumberInput>
  )
}

export function NumberComponent() {
  const props = useInputContext<NumberProps>()
  const { label, value, onUpdate, settings } = props
  const { min, max } = settings
  const hasRange = max !== Infinity && min !== -Infinity
  return (
    <Row input>
      <Label>{label}</Label>
      <RangeGrid hasRange={hasRange}>
        {hasRange && <RangeSlider value={value} onDrag={onUpdate} {...settings} />}
        <Number {...props} label="value" />
      </RangeGrid>
    </Row>
  )
}
