import React, { useMemo } from 'react'
import { useDrag } from 'react-use-gesture'
import useMeasure from 'react-use-measure'
import { useRange, useInvertedRange } from './bezier-utils'
import { Svg } from './StyledBezier'
import type { Bezier as BezierType, BezierProps } from './bezier-types'

const HANDLE_RADIUS = 4

interface LineProps {
  sx: number
  sy: number
  cx: number
  cy: number
}

function Line({ sx, sy, cx, cy }: LineProps) {
  const a = Math.atan2(cy - sy, cx - sx)
  const cxs = cx - HANDLE_RADIUS * Math.cos(a)
  const cys = cy - HANDLE_RADIUS * Math.sin(a)

  return <line x1={cxs} y1={cys} x2={sx} y2={sy} />
}

export function BezierSvg({ displayValue, onUpdate, value }: Pick<BezierProps, 'displayValue' | 'value' | 'onUpdate'>) {
  const r = useRange()
  const ir = useInvertedRange()
  const [ref, { width, height }] = useMeasure()

  const bind = useDrag(
    ({ movement: [x, y], args: [i] }) => {
      onUpdate((v: BezierType) => {
        const newV = [...v]
        newV[i] = ir(x, width)
        newV[i + 1] = 1 - ir(y, height)
        return newV
      })
    },
    { initial: ({ args: [i] }) => [r(value[i], width), r(1 - value[i + 1], height)] }
  )

  const { x1, y1, x2, y2 } = displayValue

  const { sx, sy, ex, ey, cx1, cy1, cx2, cy2 } = useMemo(
    () => ({
      sx: r(0, width),
      sy: r(1, height),
      ex: r(1, width),
      ey: r(0, height),
      cx1: r(x1, width),
      cy1: r(1 - y1, height),
      cx2: r(x2, width),
      cy2: r(1 - y2, height),
    }),
    [r, x1, y1, x2, y2, width, height]
  )

  return (
    <Svg ref={ref}>
      <line x1={sx} y1={sy} x2={ex} y2={ey} />
      <path fill="none" d={`M${sx},${sy} C${cx1},${cy1} ${cx2},${cy2} ${ex},${ey}`} strokeLinecap="round" />
      <g>
        <Line sx={sx} sy={sy} cx={cx1} cy={cy1} />
        <circle cx={cx1} cy={cy1} r={HANDLE_RADIUS} {...bind(0)} />
      </g>
      <g>
        <Line sx={ex} sy={ey} cx={cx2} cy={cy2} />
        <circle cx={cx2} cy={cy2} r={HANDLE_RADIUS} {...bind(2)} />
      </g>
    </Svg>
  )
}
