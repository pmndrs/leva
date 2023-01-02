import React, { useEffect, useState, useMemo, useReducer } from 'react'
import { debounce } from 'leva/plugin'

import { PreviewSvg } from './StyledBezier'

import type { BezierProps } from './bezier-types'

const DebouncedBezierPreview = React.memo(({ value }: Pick<BezierProps, 'value'>) => {
  // use to forceUpdate on click
  const [, forceUpdate] = useReducer((x) => x + 1, 0)

  const plotPoints = Array(21)
    .fill(0)
    .map((_, i) => 5 + value.evaluate(i / 20) * 90)
  return (
    <PreviewSvg onClick={forceUpdate}>
      {plotPoints.map((p, i) => (
        <circle key={i + Date.now()} r={3} cx={`${p}%`} style={{ animationDelay: `${i * 50}ms` }} />
      ))}
      <circle
        key={Date.now() - 1}
        r={3}
        style={{
          animationTimingFunction: `cubic-bezier(${value.join(',')})`,
          animationDuration: `${plotPoints.length * 50}ms`,
        }}
      />
    </PreviewSvg>
  )
})

export function BezierPreview({ value }: Pick<BezierProps, 'value'>) {
  const [debouncedValue, set] = useState(value)
  const debounceValue = useMemo(() => debounce((v: typeof value) => set(v), 250), [])
  useEffect(() => void debounceValue(value), [value, debounceValue])

  return <DebouncedBezierPreview value={debouncedValue} />
}
