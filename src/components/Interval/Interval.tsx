import React, { useRef } from 'react'
import styled from '@xstyled/styled-components'
import { TwixInputProps } from '../../types'
import { Interval as IntervalType, IntervalSettings } from './interval-props'
import { Label, Row } from '../styles'
import { PointCoordinates } from '../PointCoordinates'
import { Range, Scrubber } from '../Number'
import { useDrag } from 'react-use-gesture'
import { invertedRange, range } from '../../utils'

type IntervalProps = TwixInputProps<IntervalType, IntervalSettings>
type IntervalSliderProps = { value: IntervalType; min: number; max: number; onDrag: (v: IntervalType) => void }

const Container = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  grid-column-gap: col-gap;
`

function IntervalSlider({ value, min, max, onDrag }: IntervalSliderProps) {
  const ref = useRef<HTMLDivElement>(null)
  const rangeWidth = useRef<number>(0)

  const bind = useDrag(({ first, movement: [x], args: [key], memo = value[key as keyof IntervalType] }) => {
    if (first) {
      rangeWidth.current = ref.current!.getBoundingClientRect().width - 12
    }
    onDrag({ ...value, [key]: memo + invertedRange(x / rangeWidth.current, 0, max - min) })
    return memo
  })

  return (
    <Range ref={ref}>
      <Scrubber {...bind('min')} style={{ left: `calc(${range(value.min, min, max)} * (100% - 12px))` }} />
      <Scrubber {...bind('max')} style={{ left: `calc(${range(value.max, min, max)} * (100% - 12px))` }} />
    </Range>
  )
}

export function Interval({ label, value, onUpdate, settings }: IntervalProps) {
  const { bounds, ..._settings } = settings!
  // FIXME fix value as any in Interval
  return (
    <Row input>
      <Label>{label}</Label>
      <Row>
        <Row>
          <IntervalSlider value={value} min={bounds[0]} max={bounds[1]} onDrag={onUpdate} />
        </Row>
        <Container>
          <PointCoordinates value={value as any} settings={_settings} onUpdate={onUpdate} />
        </Container>
      </Row>
    </Row>
  )
}
