import React, { useRef } from 'react'
import styled from '@xstyled/styled-components'
import { TwixInputProps } from '../../types'
import { InternalInterval, InternalIntervalSettings } from './interval-plugin'
import { Label, Row } from '../styles'
import { PointCoordinates } from '../PointCoordinates'
import { Range, Scrubber } from '../Number'
import { useDrag } from '../../hooks'
import { invertedRange, range } from '../../utils'
import { useThemeValue } from '../../hooks'

type IntervalProps = TwixInputProps<InternalInterval, InternalIntervalSettings>
type IntervalSliderProps = { value: InternalInterval; min: number; max: number; onDrag: (v: InternalInterval) => void }

const Container = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  grid-column-gap: col-gap;
`

const Indicator = styled.div`
  position: absolute;
  height: 100%;
  background-color: accent;
`

function IntervalSlider({ value, min, max, onDrag }: IntervalSliderProps) {
  const ref = useRef<HTMLDivElement>(null)
  const rangeWidth = useRef<number>(0)
  const scrubberWidth: string = useThemeValue('size', 'scrubber-width')

  const bind = useDrag(({ first, movement: [x], args: [key], memo = value[key as keyof InternalInterval] }) => {
    if (first) {
      rangeWidth.current = ref.current!.getBoundingClientRect().width - parseFloat(scrubberWidth)
    }
    onDrag({ ...value, [key]: memo + invertedRange(x / rangeWidth.current, 0, max - min) })
    return memo
  })

  const minStyle = `calc(${range(value.min, min, max)} * (100% - ${scrubberWidth}))`
  const maxStyle = `calc(${1 - range(value.max, min, max)} * (100% - ${scrubberWidth}))`

  return (
    <Range ref={ref}>
      <Indicator style={{ left: minStyle, right: maxStyle }} />
      <Scrubber {...bind('min')} style={{ left: minStyle }} />
      <Scrubber {...bind('max')} style={{ right: maxStyle }} />
    </Range>
  )
}

export function Interval({ label, value, onUpdate, settings }: IntervalProps) {
  const { bounds, ..._settings } = settings!

  return (
    <Row input>
      <Label>{label}</Label>
      <Row>
        <Row>
          <IntervalSlider value={value} min={bounds[0]} max={bounds[1]} onDrag={onUpdate} />
        </Row>
        <Container>
          <PointCoordinates value={value} settings={_settings} onUpdate={onUpdate} />
        </Container>
      </Row>
    </Row>
  )
}
