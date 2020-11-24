import React from 'react'
import { ValueInput } from '../ValueInput'
import { TwixInputProps } from '../../types'
import { NumberSettings } from './number-props'
import { Label, Row } from '../styles'
import { useDragNumber } from '../../hooks'

type NumberProps = TwixInputProps<number, NumberSettings>

const defaultSettings = { step: 1 }

export function Number({ label, formattedValue, value, onUpdate, onChange, settings = defaultSettings }: NumberProps) {
  const bind = useDragNumber({ value, step: settings.step, onDrag: onUpdate })
  return (
    <Row grid>
      <Label {...bind()} style={{ cursor: 'ew-resize', userSelect: 'none' }}>
        {label}
      </Label>
      <ValueInput value={formattedValue} onUpdate={onUpdate} onChange={onChange} />
    </Row>
  )
}

export function NumberInner({
  label,
  formattedValue,
  value,
  onUpdate,
  onChange,
  settings = defaultSettings,
}: NumberProps) {
  const bind = useDragNumber({ value, step: settings.step, onDrag: onUpdate })
  return (
    <ValueInput value={formattedValue} onUpdate={onUpdate} onChange={onChange}>
      <div {...bind()}>{label}</div>
    </ValueInput>
  )
}
