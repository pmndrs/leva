import React, { useEffect, useState, useMemo, useReducer } from 'react'
import { debounce } from 'leva/plugin'
import { bezier } from './bezier-utils'
import { PreviewSvg } from './StyledBezier'
import type { BezierProps } from './bezier-types'

const DebouncedBezierPreview = React.memo(({ value }: Pick<BezierProps, 'value'>) => {
  const [, forceUpdate] = useReducer((x) => x + 1, 0)

  const bezierFn = bezier(...value)
  const plotPoints = Array(11)
    .fill(0)
    .map((_, i) => 5 + bezierFn(i / 10) * 90)
  return (
    <PreviewSvg onClick={forceUpdate}>
      {plotPoints.map((p, i) => (
        <circle key={i + Date.now()} r={3} cx={`${p}%`} style={{ animationDelay: `${i * 100}ms` }} />
      ))}
    </PreviewSvg>
  )
})

export function BezierPreview({ value }: Pick<BezierProps, 'value'>) {
  const [debouncedValue, set] = useState(value)
  const debounceValue = useMemo(() => debounce((v: typeof value) => set(v), 250), [])
  useEffect(() => void debounceValue(value), [value, debounceValue])

  return <DebouncedBezierPreview value={debouncedValue} />
}
