import React, { useState, useCallback, useEffect, useMemo, useRef } from 'react'
import { useMove, type FullGestureState } from '@use-gesture/react'
import { useCanvas2d, useTh, range, invertedRange, debounce, useTransform, clamp, Components } from 'leva/plugin'
import { Wrapper, Canvas, Dot, ToolTip } from './StyledPlot'
import type { InternalPlot, InternalPlotSettings } from './plot-types'

type PlotCanvasProps = { value: InternalPlot; settings: InternalPlotSettings }

export const PlotCanvas = React.memo(({ value: expr, settings }: PlotCanvasProps) => {
  const { boundsX, boundsY } = settings

  const accentColor = useTh('colors', 'highlight3')
  const yPositions = useRef<number[]>([])

  const canvasBoundsY = useRef({ minY: -Infinity, maxY: Infinity })

  const drawPlot = useCallback(
    (_canvas: HTMLCanvasElement, _ctx: CanvasRenderingContext2D) => {
      // fixes unmount potential bug
      if (!_canvas) return
      const { width, height } = _canvas

      const points: number[] = []

      // compute the expressions
      const [minX, maxX] = boundsX
      canvasBoundsY.current.minY = Infinity
      canvasBoundsY.current.maxY = -Infinity
      for (let i = 0; i < width; i++) {
        // maps the width of the canvas to minX / maxX
        const x = invertedRange(range(i, 0, width), minX, maxX)
        const v = expr(x)
        if (v < canvasBoundsY.current.minY && v !== -Infinity) canvasBoundsY.current.minY = v
        if (v > canvasBoundsY.current.maxY && v !== Infinity) canvasBoundsY.current.maxY = v
        // adds the value to the points array
        points.push(v)
      }

      if (boundsY[0] !== -Infinity) canvasBoundsY.current.minY = boundsY[0]
      if (boundsY[1] !== Infinity) canvasBoundsY.current.maxY = boundsY[1]

      // clear
      _ctx.clearRect(0, 0, width, height)

      yPositions.current = []

      // compute the path
      const path = new Path2D()
      for (let i = 0; i < width; i++) {
        const v = invertedRange(range(points[i], canvasBoundsY.current.minY, canvasBoundsY.current.maxY), height - 5, 5)
        yPositions.current.push(v)
        path.lineTo(i, v)
      }

      // draw the white line
      _ctx.strokeStyle = accentColor
      _ctx.lineWidth = 2
      _ctx.stroke(path)
    },
    [expr, boundsX, boundsY, accentColor]
  )

  const [canvas, ctx] = useCanvas2d(drawPlot)

  // replace with throttle
  const updatePlot = useMemo(
    () => debounce(() => drawPlot(canvas.current!, ctx.current!), 250),
    [canvas, ctx, drawPlot]
  )
  useEffect(() => updatePlot(), [updatePlot])

  const [toolTipOpen, toggleToolTip] = useState(false)
  const [toolTipValues, setToolTipValues] = useState({ x: '0', y: '0' })

  const [dotRef, set] = useTransform<HTMLDivElement>()
  const canvasBounds = useRef<DOMRect>()

  const bind = useMove((state: FullGestureState<'move'>) => {
    const {
      xy: [x],
      first,
    } = state
    if (first) {
      canvasBounds.current = canvas.current!.getBoundingClientRect()
    }
    const { left, top, width, height } = canvasBounds.current!
    const [minX, maxX] = boundsX
    const i = Math.ceil(x - left)
    const valueX = invertedRange(range(i, 0, width), minX, maxX)
    let valueY = expr(valueX)
    valueY = isFinite(valueY) ? valueY.toFixed(2) : 'NaN'

    const relY = clamp(yPositions.current[i * window.devicePixelRatio] / window.devicePixelRatio, 0, height)

    setToolTipValues({ x: valueX.toFixed(2), y: valueY })
    set({ x: left + i - 3, y: top + relY - 5 + 2 })
  })

  return (
    <Wrapper onMouseEnter={() => toggleToolTip(true)} onMouseLeave={() => toggleToolTip(false)}>
      <Canvas ref={canvas} {...bind()} />
      {toolTipOpen && (
        <Components.Portal>
          <Dot ref={dotRef}>
            <ToolTip>
              x: {toolTipValues.x}
              <br />
              y: {toolTipValues.y}
            </ToolTip>
          </Dot>
        </Components.Portal>
      )}
    </Wrapper>
  )
})
