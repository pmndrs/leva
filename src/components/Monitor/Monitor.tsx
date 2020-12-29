import React, { useState, useEffect, useCallback, useRef } from 'react'
import { Canvas } from './StyledMonitor'
import { Row, Label } from '../styles'
import { range } from '../../utils'
import { useCanvas2d, useThemeValue } from '../../hooks'

type MonitorProps = {
  valueKey: string
  objectOrFn: React.MutableRefObject<any> | Function
}

const POINTS = 100

function getValue(o: React.MutableRefObject<any> | Function) {
  return typeof o === 'function' ? o() : o.current
}

function push(arr: any[], val: any) {
  arr.push(val)
  if (arr.length > POINTS) arr.shift()
}

export function Monitor({ objectOrFn, valueKey }: MonitorProps) {
  // const [value, set] = useState(getValue(objectOrFn))
  const accentColor = useThemeValue('color', 'accent')
  const points = useRef([])
  const min = useRef()
  const max = useRef()

  const drawPlot = useCallback(
    (_canvas: HTMLCanvasElement, _ctx: CanvasRenderingContext2D) => {
      const { width, height } = _canvas
      _ctx.clearRect(0, 0, width, height)
      _ctx.beginPath()
      const interval = width / POINTS
      for (let i = 0; i < points.current.length; i++) {
        const p = range(points.current[i], min.current!, max.current!)
        _ctx.lineTo(interval * i, p * height * 0.9)
      }
      _ctx.strokeStyle = accentColor
      _ctx.stroke()
    },
    [accentColor]
  )

  const [canvas, ctx] = useCanvas2d(drawPlot)

  useEffect(() => {
    const timeout = setInterval(() => {
      const val = getValue(objectOrFn)
      // set(val)
      if (min.current === undefined || val < min.current!) min.current = val
      if (max.current === undefined || val > max.current!) max.current = val
      push(points.current, val)
      requestAnimationFrame(() => drawPlot(canvas.current!, ctx.current!))
    }, 30)
    return () => clearInterval(timeout)
  }, [objectOrFn, drawPlot, canvas, ctx])

  return (
    <Row input>
      <Label>{valueKey}</Label>
      {/* <div>{value}</div> */}
      <Canvas ref={canvas} />
    </Row>
  )
}
