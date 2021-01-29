import React, { useRef } from 'react'
import { RangeWrapper, Range, Scrubber } from './StyledRange'
import { InternalNumberSettings, sanitizeStep } from './number-plugin'
import { useDrag } from '../../hooks'
import { invertedRange, range } from '../../utils'
import { useTh } from '../../styles'

type RangeSliderProps = { value: number; onDrag: (v: number) => void } & InternalNumberSettings

export function RangeSlider({ value, min, max, onDrag, step, initialValue }: RangeSliderProps) {
  const ref = useRef<HTMLDivElement>(null)
  const scrubberRef = useRef<HTMLDivElement>(null)
  const rangeWidth = useRef<number>(0)
  const scrubberWidth = useTh('sizes', '$scrubberWidth')

  const bind = useDrag(({ event, first, xy: [x], movement: [mx], memo }) => {
    if (first) {
      // rangeWidth is the width of the slider el minus the width of the scrubber el itself
      const { width, left } = ref.current!.getBoundingClientRect()
      rangeWidth.current = width - parseFloat(scrubberWidth)

      const targetIsScrub = event?.target === scrubberRef.current
      // memo is the value where the user clicked on
      memo = targetIsScrub ? value : invertedRange((x - left) / width, min, max)
    }
    const newValue = memo + invertedRange(mx / rangeWidth.current, 0, max - min)
    onDrag(sanitizeStep(newValue, { step, initialValue }))
    return memo
  })

  return (
    <RangeWrapper ref={ref} {...bind()}>
      <Range />
      <Scrubber ref={scrubberRef} style={{ left: `calc(${range(value, min, max)} * (100% - ${scrubberWidth}))` }} />
    </RangeWrapper>
  )
}
