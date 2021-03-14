import React, { useCallback, useEffect, useMemo } from 'react'
import { useCanvas2d, useTh, range, invertedRange, useValues, debounce } from 'leva/plugin'
import * as math from 'mathjs'
import { Canvas } from './StyledPlot'
import type { InternalPlot, InternalPlotSettings } from './plot-types'

function getSymbols(expr: math.MathNode) {
  return expr
    .filter((node) => {
      if (node.isSymbolNode) {
        try {
          node.evaluate()
        } catch {
          return node.name !== 'x'
        }
      }
      return false
    })
    .map(({ name }) => name!)
}

type PlotCanvasProps = { value: InternalPlot; settings: InternalPlotSettings }

export const PlotCanvas = React.memo(({ value, settings }: PlotCanvasProps) => {
  const { boundsX, boundsY } = settings

  const accentColor = useTh('colors', 'leva__highlight3')

  const [expr, symbols] = useMemo(() => {
    const symbols = getSymbols(value)
    const expr = value.compile()
    return [expr, symbols]
  }, [value])

  const scope = useValues(symbols)

  const drawPlot = useCallback(
    (_canvas: HTMLCanvasElement, _ctx: CanvasRenderingContext2D) => {
      // fixes unmount potential bug
      if (!_canvas) return
      const { width, height } = _canvas

      // compute the expressions
      const points = []
      const [minX, maxX] = boundsX
      let minY = Infinity
      let maxY = -Infinity
      for (let i = 0; i < width; i++) {
        // maps the width of the canvas to minX / maxX
        const x = invertedRange(range(i, 0, width), minX, maxX)
        const value = expr.evaluate({ ...scope, x })
        if (value < minY && value !== -Infinity) minY = value
        if (value > maxY && value !== Infinity) maxY = value
        // adds the value to the points array
        points.push(value)
      }

      if (boundsY[0] !== -Infinity) minY = boundsY[0]
      if (boundsY[1] !== Infinity) maxY = boundsY[1]

      // clear
      _ctx.clearRect(0, 0, width, height)

      // compute the path
      const path = new Path2D()
      for (let i = 0; i < width; i++) {
        const value = invertedRange(range(points[i], minY, maxY), height - 5, 5)
        path.lineTo(i, value)
      }

      // draw the white line
      _ctx.strokeStyle = accentColor
      _ctx.lineWidth = 2
      _ctx.stroke(path)
    },
    [boundsX, boundsY, accentColor, scope, expr]
  )

  const [canvas, ctx] = useCanvas2d(drawPlot)

  // replace with throttle
  const updatePlot = useMemo(() => debounce(() => drawPlot(canvas.current!, ctx.current!), 250), [
    canvas,
    ctx,
    drawPlot,
  ])
  useEffect(() => updatePlot(), [updatePlot])

  return <Canvas ref={canvas} />
})
