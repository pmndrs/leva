import React, { useCallback } from 'react'
import { ValueInput } from '../ValueInput'
import { LevaInputProps } from '../../types/'
import { InternalNumberSettings } from './number-plugin'
import { Label, Row } from '../UI'
import { useDragNumber, useInputContext } from '../../hooks'
import { RangeGrid } from './StyledNumber'
import { RangeSlider } from './RangeSlider'

type NumberProps = LevaInputProps<number, InternalNumberSettings>

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
    <ValueInput value={value} onUpdate={onUpdate} onChange={onChange} onKeyDown={onKeyDown} isNumber>
      {children}
    </ValueInput>
  )
}

export function NumberInner({ valueKey, displayValue, onUpdate, onChange, settings }: Omit<NumberProps, 'label'>) {
  const bind = useDragNumber({ settings, onDrag: onUpdate })
  return (
    <NumberInput value={displayValue} onUpdate={onUpdate} onChange={onChange}>
      <div title={valueKey.length > 1 ? valueKey : ''} {...bind()} style={{ touchAction: 'none' }}>
        {valueKey.charAt(0)}
      </div>
    </NumberInput>
  )
}

export function Number() {
  const props = useInputContext<NumberProps>()
  const { label, value, onUpdate, settings } = props
  const { min, max } = settings
  const hasRange = max !== Infinity && min !== -Infinity
  return (
    <Row input>
      <Label>{label}</Label>
      <RangeGrid hasRange={hasRange}>
        {hasRange && <RangeSlider value={value} onDrag={onUpdate} {...settings} />}
        <NumberInner {...props} valueKey="value" />
      </RangeGrid>
    </Row>
  )
}
