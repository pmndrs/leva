import React, { useMemo, useRef } from 'react'
import useMeasure from 'react-use-measure'
import { mergeRefs, useDrag } from 'leva/plugin'
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

export function BezierSvg({
  displayValue,
  onUpdate,
  withPreview,
}: Pick<BezierProps, 'displayValue' | 'onUpdate'> & { withPreview: boolean }) {
  const r = useRange()
  const ir = useInvertedRange()
  const [ref, { width, height }] = useMeasure()
  const svgRef = useRef<SVGSVGElement>(null)
  const handleLeft = useRef<SVGCircleElement>(null)
  const handleRight = useRef<SVGCircleElement>(null)
  const bounds = useRef<DOMRect>()

  const bind = useDrag(({ xy: [x, y], event, first, memo }) => {
    if (first) {
      bounds.current = svgRef.current!.getBoundingClientRect()
      memo = [handleLeft.current, handleRight.current].indexOf(event!.target as any)
      if (memo < 0) memo = x - bounds.current.left < width / 2 ? 0 : 1
      memo *= 2
    }

    const relX = x - bounds.current!.left
    const relY = y - bounds.current!.top

    onUpdate((v: BezierType) => {
      const newV = [...v]
      newV[memo] = ir(relX, width)
      newV[memo + 1] = 1 - ir(relY, height)
      return newV
    })

    return memo
  })

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
    // @ts-ignore
    <Svg ref={mergeRefs([svgRef, ref])} {...bind()} withPreview={withPreview}>
      <line x1={sx} y1={sy} x2={ex} y2={ey} />
      <path fill="none" d={`M${sx},${sy} C${cx1},${cy1} ${cx2},${cy2} ${ex},${ey}`} strokeLinecap="round" />
      <g>
        <Line sx={sx} sy={sy} cx={cx1} cy={cy1} />
        <circle ref={handleLeft} cx={cx1} cy={cy1} r={HANDLE_RADIUS} />
      </g>
      <g>
        <Line sx={ex} sy={ey} cx={cx2} cy={cy2} />
        <circle ref={handleRight} cx={cx2} cy={cy2} r={HANDLE_RADIUS} />
      </g>
    </Svg>
  )
}
