import React from 'react'
import { NumberInput } from '../ValueInput'
import { LevaInputProps } from '../../types/'
import { InternalNumberSettings } from './number-plugin'
import { Label, Row } from '../UI'
import { useDragNumber } from '../../hooks'
import { RangeGrid, InnerNumberLabel } from './StyledNumber'
import { RangeSlider } from './RangeSlider'
import { useInputContext } from '../../context'

type NumberProps = LevaInputProps<number, InternalNumberSettings>

export function Number({
  label,
  id,
  displayValue,
  onUpdate,
  onChange,
  settings,
  hideLabel = false,
}: NumberProps & { id?: string; hideLabel?: boolean }) {
  const bind = useDragNumber({ settings, onDrag: onUpdate })

  return (
    <NumberInput id={id} value={displayValue} onUpdate={onUpdate} onChange={onChange}>
      {!hideLabel && (
        <InnerNumberLabel title={label.length > 1 ? label : ''} {...bind()}>
          {label.charAt(0)}
        </InnerNumberLabel>
      )}
    </NumberInput>
  )
}

export function NumberComponent() {
  const props = useInputContext<NumberProps>()
  const { label, value, onUpdate, settings, id } = props
  const { min, max } = settings
  const hasRange = max !== Infinity && min !== -Infinity

  return (
    <Row input>
      <Label>{label}</Label>
      <RangeGrid hasRange={hasRange}>
        {hasRange && <RangeSlider value={parseFloat(value as any)} onDrag={onUpdate} {...settings} />}
        <Number {...props} id={id} label="value" hideLabel={hasRange} />
      </RangeGrid>
    </Row>
  )
}
