import React from 'react'
import { ValueInput } from '../ValueInput'
import { TwixInputProps } from '../../types'
import { NumberSettings } from './number-props'
import { Label, Row } from '../styles'
import { useDragNumber } from '../../hooks'

type NumberProps = TwixInputProps<number, NumberSettings>

const defaultSettings = { step: 1 }

export function Number({ label, displayedValue, value, onUpdate, onChange, settings = defaultSettings }: NumberProps) {
  const bind = useDragNumber({ value, step: settings.step, onDrag: onUpdate })
  const hasRangeSlider = settings.max !== Infinity && settings.min !== -Infinity
  return (
    <Row grid>
      <Label {...bind()} style={{ cursor: 'ew-resize', userSelect: 'none' }}>
        {label}
      </Label>
      <div>
        {hasRangeSlider && 'RANGE'}
        <ValueInput value={displayedValue} onUpdate={onUpdate} onChange={onChange} />
      </div>
    </Row>
  )
}

export function NumberInner({
  label,
  displayedValue,
  value,
  onUpdate,
  onChange,
  settings = defaultSettings,
}: NumberProps) {
  const bind = useDragNumber({ value, step: settings.step, onDrag: onUpdate })
  return (
    <ValueInput value={displayedValue} onUpdate={onUpdate} onChange={onChange}>
      <div title={label} {...bind()}>
        {label.charAt(0)}
      </div>
    </ValueInput>
  )
}
