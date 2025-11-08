import React, { useRef, useMemo, useState, useEffect } from 'react'
import { RangeWrapper, Range, Scrubber, Indicator } from './StyledRange'
import { sanitizeStep } from './number-plugin'
import { useDrag } from '../../hooks'
import { invertedRange, range } from '../../utils'
import { useTh } from '../../styles'
import type { RangeSliderProps } from './number-types'

// ===========================================
// STEP VISUALIZATION CONFIGURATION
// ===========================================

// Minimum spacing between step indicators in pixels
// - Set to 0 to always show step visualization
// - Increase (e.g., 5-10) to reduce visual clutter when steps are dense
const MIN_STEP_SPACING_PX = 3

// Visualization mode - CHANGE THIS TO SWITCH MODES:
// - 'lines': Vertical lines inside the range bar (subtle, integrated)
// - 'dots': Circles below the range bar (prominent, separated)
type StepVisualizationMode = 'lines' | 'dots'
const STEP_VISUALIZATION_MODE: StepVisualizationMode = 'dots'

export function RangeSlider({ value, min, max, onDrag, step, initialValue }: RangeSliderProps) {
  const ref = useRef<HTMLDivElement>(null)
  const scrubberRef = useRef<HTMLDivElement>(null)
  const rangeWidth = useRef<number>(0)
  const scrubberWidth = useTh('sizes', 'scrubberWidth')
  const [elementWidth, setElementWidth] = useState(0)

  useEffect(() => {
    if (ref.current) {
      const updateWidth = () => {
        const { width } = ref.current!.getBoundingClientRect()
        setElementWidth(width)
      }
      updateWidth()

      // Update width on resize
      const resizeObserver = new ResizeObserver(updateWidth)
      resizeObserver.observe(ref.current)

      return () => resizeObserver.disconnect()
    }
  }, [])

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

  const pos = range(value, min, max)

  // Calculate step lines for visualization
  const stepLines = useMemo(() => {
    if (!step || !Number.isFinite(min) || !Number.isFinite(max) || elementWidth === 0) return []

    const rangeSpan = max - min
    const stepCount = Math.floor(rangeSpan / step)

    if (stepCount <= 1) return []

    // Calculate step spacing in pixels
    const stepSpacingPx = (elementWidth * step) / rangeSpan

    // Don't show step lines if they would be too close together
    if (stepSpacingPx < MIN_STEP_SPACING_PX) return []

    const lines = []
    for (let i = 1; i < stepCount; i++) {
      const stepValue = min + i * step
      const stepPos = range(stepValue, min, max)
      lines.push(stepPos * 100) // Convert to percentage
    }

    return lines
  }, [step, min, max, elementWidth])

  return (
    <RangeWrapper ref={ref} {...bind()}>
      <Range>
        {stepLines.length > 0 && STEP_VISUALIZATION_MODE === 'lines' && (
          <svg
            style={{
              position: 'absolute',
              top: 0,
              left: 0,
              width: '100%',
              height: '100%',
              pointerEvents: 'none',
            }}>
            {stepLines.map((linePos, index) => (
              <line
                key={index}
                x1={`${linePos}%`}
                y1="0"
                x2={`${linePos}%`}
                y2="100%"
                stroke="currentColor"
                strokeWidth="1"
                opacity="0.2"
              />
            ))}
          </svg>
        )}
        {stepLines.length > 0 && STEP_VISUALIZATION_MODE === 'dots' && (
          <svg
            style={{
              position: 'absolute',
              top: '100%',
              left: 0,
              width: '100%',
              height: '8px',
              pointerEvents: 'none',
            }}>
            {stepLines.map((dotPos, index) => (
              <circle key={index} cx={`${dotPos}%`} cy="4" r="1.25" fill="currentColor" opacity="0.4" />
            ))}
          </svg>
        )}
        <Indicator style={{ left: 0, right: `${(1 - pos) * 100}%` }} />
      </Range>
      <Scrubber ref={scrubberRef} style={{ left: `calc((${pos} * 100%) - (var(--leva-sizes-scrubberWidth) / 2))` }} />
    </RangeWrapper>
  )
}
