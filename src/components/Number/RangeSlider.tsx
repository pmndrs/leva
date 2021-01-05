import React, { useRef } from 'react'
import { useTh } from '@xstyled/styled-components'
import { RangeWrapper, Range, Scrubber } from './StyledRange'
import { invertedRange, range } from '../../utils'
import { useDrag } from '../../hooks'

type RangeSliderProps = { value: number; min: number; max: number; onDrag: (v: number) => void }

export function RangeSlider({ value, min, max, onDrag }: RangeSliderProps) {
  const ref = useRef<HTMLDivElement>(null)
  const scrubberRef = useRef<HTMLDivElement>(null)
  const rangeWidth = useRef<number>(0)
  const scrubberWidth = useTh('sizes.scrubber-width')

  const bind = useDrag(({ event, first, xy: [x], movement: [mx], memo }) => {
    if (first) {
      // rangeWidth is the width of the slider el minus the width of the scrubber el itself
      const { width, left } = ref.current!.getBoundingClientRect()
      rangeWidth.current = width - scrubberWidth

      const targetIsScrub = event?.target === scrubberRef.current
      // memo is the value where the user clicked on
      memo = targetIsScrub ? value : invertedRange((x - left) / width - 0.5, 0, max - min)
    }
    onDrag(memo + invertedRange(mx / rangeWidth.current, 0, max - min))
    return memo
  })

  return (
    <RangeWrapper ref={ref} {...bind()}>
      <Range />
      <Scrubber ref={scrubberRef} style={{ left: `calc(${range(value, min, max)} * (100% - ${scrubberWidth}px))` }} />
    </RangeWrapper>
  )
}
