import React, { useRef, useState } from 'react'
import { RangeWrapper, Range, Scrubber, Indicator } from './StyledRange'
import { sanitizeStep } from './number-plugin'
import { useDrag } from '../../hooks'
import { invertedRange, range, sanitizeValue } from '../../utils'
import { useTh } from '../../styles'
import type { RangeSliderProps } from './number-types'
import { useWheel } from '../../hooks/useWheel'

export function RangeSlider({ value, min, max, onDrag, step, initialValue }: RangeSliderProps) {
  const ref = useRef<HTMLDivElement>(null)
  const scrubberRef = useRef<HTMLDivElement>(null)
  const rangeWidth = useRef<number>(0)
  const scrubberWidth = useTh('sizes', 'scrubberWidth')
  const [previousValue, setPreviousValue] = useState(initialValue)

  const bind = useWheel(
    (state) => {
      let {
        first,
        movement: [, my],
        memo,
      } = state
      if (first) {
        memo = my
        setPreviousValue(initialValue)
      }
      // 1 scroll = memo = 1 step
      console.log({ previousValue: previousValue.toFixed(2), memo: memo, my: my.toFixed(2) })
      const newValue = Math.max(Math.min(previousValue + ((my + memo) / 1000) * -1 * step, max), min)
      setPreviousValue(newValue)
      onDrag(sanitizeStep(newValue, { step, initialValue }))
      return memo
    },
    { preventDefault: true }
  )
  /* const bind = useDrag(({ event, first, xy: [x], movement: [mx], memo }) => {
    if (first) {
      // rangeWidth is the width of the slider el minus the width of the scrubber el itself
      const { width, left } = ref.current!.getBoundingClientRect()
      rangeWidth.current = width - parseFloat(scrubberWidth)

      const targetIsScrub = event?.target === scrubberRef.current
      // memo is the value where the user clicked on
      memo = targetIsScrub ? value : invertedRange((x - left) / width, min, max)
      console.log(memo)
    }
    const newValue = memo + invertedRange(mx / rangeWidth.current, 0, max - min)
    console.log(sanitizeStep(newValue, { step, initialValue }))
    onDrag(sanitizeStep(newValue, { step, initialValue }))
    return memo
  }) */

  const pos = range(value, min, max)

  return (
    <RangeWrapper ref={ref} {...bind()}>
      <Range>
        <Indicator style={{ left: 0, right: `${(1 - pos) * 100}%` }} />
      </Range>
      <Scrubber ref={scrubberRef} style={{ left: `calc(${pos} * (100% - ${scrubberWidth}))` }} />
    </RangeWrapper>
  )
}
