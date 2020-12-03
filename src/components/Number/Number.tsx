import React, { useRef } from 'react'
import { ValueInput } from '../ValueInput'
import { TwixInputProps } from '../../types'
import { InternalNumberSettings } from './number-props'
import { Label, Row } from '../styles'
import { useDragNumber } from '../../hooks'
import { Range, RangeGrid, Scrubber } from './StyledNumber'
import { useDrag } from '../../hooks'
import { invertedRange, range } from '../../utils'
import { useThemeValue } from '../../hooks/useThemeValue'

type NumberProps = TwixInputProps<number, InternalNumberSettings>
type RangeSliderProps = { value: number; min: number; max: number; onDrag: (v: number) => void }

function RangeSlider({ value, min, max, onDrag }: RangeSliderProps) {
  const ref = useRef<HTMLDivElement>(null)
  const rangeWidth = useRef<number>(0)
  const scrubberWidth: string = useThemeValue('size', 'scrubber-width')

  const bind = useDrag(({ first, movement: [x], memo = value }) => {
    if (first) {
      // rangeWidth is the width of the slider el minus the width of the scrubber el itself
      rangeWidth.current = ref.current!.getBoundingClientRect().width - parseFloat(scrubberWidth)
    }
    onDrag(memo + invertedRange(x / rangeWidth.current, 0, max - min))
    return memo
  })

  return (
    <Range ref={ref}>
      <Scrubber {...bind()} style={{ left: `calc(${range(value, min, max)} * (100% - ${scrubberWidth}))` }} />
    </Range>
  )
}

export function Number({ label, displayValue, value, onUpdate, onChange, settings }: NumberProps) {
  const { min, max, step } = settings
  const bind = useDragNumber({ value, step, onDrag: onUpdate })
  const hasRange = max !== Infinity && min !== -Infinity
  return (
    <Row input>
      <Label {...bind()} preventSelect>
        {label}
      </Label>
      <RangeGrid hasRange={hasRange}>
        {hasRange && <RangeSlider value={value} min={min!} max={max!} onDrag={onUpdate} />}
        <ValueInput value={displayValue} onUpdate={onUpdate} onChange={onChange} />
      </RangeGrid>
    </Row>
  )
}

export function NumberInner({ label, displayValue, value, onUpdate, onChange, settings }: NumberProps) {
  const bind = useDragNumber({ value, step: settings.step, onDrag: onUpdate })
  return (
    <ValueInput value={displayValue} onUpdate={onUpdate} onChange={onChange}>
      <div title={label.length > 1 ? label : ''} {...bind()}>
        {label.charAt(0)}
      </div>
    </ValueInput>
  )
}
