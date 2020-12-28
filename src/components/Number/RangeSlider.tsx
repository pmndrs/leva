import React, { useRef } from 'react'
import { Range, Scrubber } from './StyledRange'
import { invertedRange, range } from '../../utils'
import { useThemeValue } from '../../hooks'
import { useDrag } from '../../hooks'

type RangeSliderProps = { value: number; min: number; max: number; onDrag: (fn: (v: number) => number) => void }

export function RangeSlider({ value, min, max, onDrag }: RangeSliderProps) {
  const ref = useRef<HTMLDivElement>(null)
  const rangeWidth = useRef<number>(0)
  const scrubberWidth: string = useThemeValue('size', 'scrubber-width')

  const bind = useDrag(({ first, delta: [dx] }) => {
    if (first) {
      // rangeWidth is the width of the slider el minus the width of the scrubber el itself
      rangeWidth.current = ref.current!.getBoundingClientRect().width - parseFloat(scrubberWidth)
    }
    onDrag(v => v + invertedRange(dx / rangeWidth.current, 0, max - min))
  })

  return (
    <Range ref={ref}>
      <Scrubber {...bind()} style={{ left: `calc(${range(value, min, max)} * (100% - ${scrubberWidth}))` }} />
    </Range>
  )
}
