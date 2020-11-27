import React, { useRef } from 'react'
import { ValueInput } from '../ValueInput'
import { TwixInputProps } from '../../types'
import { NumberSettings } from './number-props'
import { Label, Row } from '../styles'
import { useDragNumber } from '../../hooks'
import { Range, RangeGrid, Scrubber } from './StyledNumber'
import { useDrag } from 'react-use-gesture'
import { invertedRange, range } from '../../utils'

type NumberProps = TwixInputProps<number, NumberSettings>
type RangeSliderProps = { value: number; min: number; max: number; onDrag: (v: number) => void }

const defaultSettings = { step: 1 }

function RangeSlider({ value, min, max, onDrag }: RangeSliderProps) {
  const ref = useRef<HTMLDivElement>(null)
  const rangeWidth = useRef<number>(0)

  const bind = useDrag(({ first, movement: [x], memo = value }) => {
    if (first) {
      // rangeWidth is the width of the slider el minus the width of the scrubber el itself
      rangeWidth.current = ref.current!.getBoundingClientRect().width - 12
    }
    onDrag(memo + invertedRange(x / rangeWidth.current, 0, max - min))
    return memo
  })

  return (
    <Range ref={ref}>
      <Scrubber {...bind()} style={{ left: `calc(${range(value, min, max)} * (100% - 12px))` }} />
    </Range>
  )
}

export function Number({ label, displayedValue, value, onUpdate, onChange, settings = defaultSettings }: NumberProps) {
  const { min, max, step } = settings
  const bind = useDragNumber({ value, step, onDrag: onUpdate })
  const hasRange = max !== Infinity && min !== -Infinity
  return (
    <Row input>
      <Label {...bind()} style={{ cursor: 'ew-resize', userSelect: 'none' }}>
        {label}
      </Label>
      <RangeGrid hasRange={hasRange}>
        {hasRange && <RangeSlider value={value} min={min!} max={max!} onDrag={onUpdate} />}
        <ValueInput value={displayedValue} onUpdate={onUpdate} onChange={onChange} />
      </RangeGrid>
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
