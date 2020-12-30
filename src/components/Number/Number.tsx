import React, { useCallback } from 'react'
import { ValueInput } from '../ValueInput'
import { TwixInputProps } from '../../types'
import { InternalNumberSettings } from './number-plugin'
import { Label, Row } from '../styles'
import { useDragNumber } from '../../hooks'
import { RangeGrid } from './StyledNumber'
import { RangeSlider } from './RangeSlider'

type NumberProps = TwixInputProps<number, InternalNumberSettings>

type NumberInputProps = {
  value: string
  children?: React.ReactNode
  onUpdate: NumberProps['onUpdate']
  onChange: NumberProps['onChange']
}

function NumberInput({ children, value, onUpdate, onChange }: NumberInputProps) {
  const onKeyDown = useCallback(
    (event: React.KeyboardEvent) => {
      const dir = event.key === 'ArrowUp' ? 1 : event.key === 'ArrowDown' ? -1 : 0
      if (dir) {
        event.preventDefault()
        const step = event.altKey ? 0.1 : event.shiftKey ? 10 : 1
        onUpdate((v: number) => v + dir * step)
      }
    },
    [onUpdate]
  )
  return (
    <ValueInput value={value} onUpdate={onUpdate} onChange={onChange} onKeyDown={onKeyDown}>
      {children}
    </ValueInput>
  )
}

export function Number({ label, displayValue, value, onUpdate, onChange, settings }: NumberProps) {
  const { min, max, step } = settings
  const bind = useDragNumber({ step, onDrag: onUpdate })
  const hasRange = max !== Infinity && min !== -Infinity
  return (
    <Row input>
      <Label {...bind()} preventSelect>
        {label}
      </Label>
      <RangeGrid hasRange={hasRange}>
        {hasRange && <RangeSlider value={value} min={min!} max={max!} onDrag={onUpdate} />}
        <NumberInput value={displayValue} onUpdate={onUpdate} onChange={onChange} />
      </RangeGrid>
    </Row>
  )
}

export function NumberInner({ label, displayValue, onUpdate, onChange, settings }: NumberProps) {
  const bind = useDragNumber({ step: settings.step, onDrag: onUpdate })
  return (
    <NumberInput value={displayValue} onUpdate={onUpdate} onChange={onChange}>
      <div title={label.length > 1 ? label : ''} {...bind()} style={{ touchAction: 'none' }}>
        {label.charAt(0)}
      </div>
    </NumberInput>
  )
}
