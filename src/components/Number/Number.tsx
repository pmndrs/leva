import React, { useRef, useCallback } from 'react'
import { ValueInput } from '../ValueInput'
import { TwixInputProps } from '../../types'
import { InternalNumberSettings } from './number-plugin'
import { Label, Row } from '../styles'
import { useDragNumber } from '../../hooks'
import { Range, RangeGrid, Scrubber } from './StyledNumber'
import { useDrag } from '../../hooks'
import { invertedRange, range } from '../../utils'
import { useThemeValue } from '../../hooks'

type NumberProps = TwixInputProps<number, InternalNumberSettings>
type RangeSliderProps = { value: number; min: number; max: number; onDrag: (fn: (v: number) => number) => void }

function RangeSlider({ value, min, max, onDrag }: RangeSliderProps) {
  const ref = useRef<HTMLDivElement>(null)
  const rangeWidth = useRef<number>(0)
  const scrubberWidth: string = useThemeValue('size', 'scrubber-width')

  const bind = useDrag(({ first, movement: [x] }) => {
    if (first) {
      // rangeWidth is the width of the slider el minus the width of the scrubber el itself
      rangeWidth.current = ref.current!.getBoundingClientRect().width - parseFloat(scrubberWidth)
    }
    onDrag(v => v + invertedRange(x / rangeWidth.current, 0, max - min))
  })

  return (
    <Range ref={ref}>
      <Scrubber {...bind()} style={{ left: `calc(${range(value, min, max)} * (100% - ${scrubberWidth}))` }} />
    </Range>
  )
}

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
      <div title={label.length > 1 ? label : ''} {...bind()}>
        {label.charAt(0)}
      </div>
    </NumberInput>
  )
}
