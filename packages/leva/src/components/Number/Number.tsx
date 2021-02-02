import React from 'react'
import { NumberInput } from '../ValueInput'
import { LevaInputProps } from '../../types/'
import { InternalNumberSettings } from './number-plugin'
import { Label, Row } from '../UI'
import { useDragNumber } from '../../hooks'
import { RangeGrid } from './StyledNumber'
import { RangeSlider } from './RangeSlider'

type NumberProps = LevaInputProps<number, InternalNumberSettings>

export function Number({ valueKey, displayValue, onUpdate, onChange, settings }: Omit<NumberProps, 'label'>) {
  const bind = useDragNumber({ settings, onDrag: onUpdate })
  return (
    <NumberInput value={displayValue} onUpdate={onUpdate} onChange={onChange}>
      <div title={valueKey.length > 1 ? valueKey : ''} {...bind()} style={{ touchAction: 'none' }}>
        {valueKey.charAt(0)}
      </div>
    </NumberInput>
  )
}

export function NumberComponent(props: NumberProps) {
  const { label, value, valueKey, onUpdate, settings } = props
  const { min, max } = settings
  const hasRange = max !== Infinity && min !== -Infinity
  return (
    <Row input>
      <Label value={value} valueKey={valueKey}>
        {label}
      </Label>
      <RangeGrid hasRange={hasRange}>
        {hasRange && <RangeSlider value={value} onDrag={onUpdate} {...settings} />}
        <Number {...props} valueKey="value" />
      </RangeGrid>
    </Row>
  )
}
