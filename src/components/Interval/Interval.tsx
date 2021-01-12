import React, { useRef } from 'react'
import styled, { useTh } from '@xstyled/styled-components'
import { LevaInputProps } from '../../types'
import { Interval as IntervalType, InternalInterval, InternalIntervalSettings } from './interval-plugin'
import { Label, Row } from '../styles'
import { PointCoordinates } from '../PointCoordinates'
import { Range, RangeWrapper, Scrubber } from '../Number'
import { useDrag } from '../../hooks'
import { invertedRange, range } from '../../utils'

type IntervalProps = LevaInputProps<IntervalType, InternalIntervalSettings>
type IntervalSliderProps = {
  value: InternalInterval
  min: number
  max: number
  onDrag: (v: InternalInterval) => void
}

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
  const minScrubberRef = useRef<HTMLDivElement>(null)
  const maxScrubberRef = useRef<HTMLDivElement>(null)
  const rangeWidth = useRef<number>(0)
  const scrubberWidth = useTh('sizes.scrubber-width')

  const bind = useDrag(({ event, first, xy: [x], movement: [mx], memo = {} }) => {
    if (first) {
      const { width, left } = ref.current!.getBoundingClientRect()
      rangeWidth.current = width - scrubberWidth

      const targetIsScrub = event?.target === minScrubberRef.current || event?.target === maxScrubberRef.current

      memo.pos = invertedRange((x - left) / width, min, max)
      memo.key = Math.abs(memo.pos - value.min) < Math.abs(memo.pos - value.max) ? 'min' : 'max'
      if (targetIsScrub) memo.pos = value[memo.key as keyof InternalInterval]
    }
    onDrag({ ...value, [memo.key]: memo.pos + invertedRange(mx / rangeWidth.current, 0, max - min) })
    return memo
  })

  const minStyle = `calc(${range(value.min, min, max)} * (100% - ${scrubberWidth}px))`
  const maxStyle = `calc(${1 - range(value.max, min, max)} * (100% - ${scrubberWidth}px))`

  return (
    <RangeWrapper ref={ref} {...bind()}>
      <Range>
        <Indicator style={{ left: minStyle, right: maxStyle }} />
      </Range>
      <Scrubber ref={minScrubberRef} style={{ left: minStyle }} />
      <Scrubber ref={maxScrubberRef} style={{ right: maxStyle }} />
    </RangeWrapper>
  )
}

export function Interval({ label, displayValue, onUpdate, settings }: IntervalProps) {
  const { bounds, ..._settings } = settings

  return (
    <Row input>
      <Label>{label}</Label>
      <Row>
        <Row>
          <IntervalSlider value={displayValue} min={bounds[0]} max={bounds[1]} onDrag={onUpdate} />
        </Row>
        <Container>
          <PointCoordinates value={displayValue as InternalInterval} settings={_settings} onUpdate={onUpdate} />
        </Container>
      </Row>
    </Row>
  )
}
