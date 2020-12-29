import React, { useState, useEffect, useCallback, useRef } from 'react'
import { Canvas } from './StyledMonitor'
import { Row, Label } from '../styles'
import { range } from '../../utils'
import { useCanvas2d, useThemeValue } from '../../hooks'
import { MonitorInput } from '../../types'

type MonitorProps = { valueKey: string } & Omit<MonitorInput, 'type'>
type ObjectProps = Pick<MonitorInput, 'objectOrFn'>

const POINTS = 100

function getValue(o: React.MutableRefObject<any> | Function) {
  return typeof o === 'function' ? o() : o.current
}

function push(arr: any[], val: any) {
  arr.push(val)
  if (arr.length > POINTS) arr.shift()
}

function MonitorCanvas({ objectOrFn }: ObjectProps) {
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
      if (min.current === undefined || val < min.current!) min.current = val
      if (max.current === undefined || val > max.current!) max.current = val
      push(points.current, val)
      requestAnimationFrame(() => drawPlot(canvas.current!, ctx.current!))
    }, 30)
    return () => clearInterval(timeout)
  }, [objectOrFn, drawPlot, canvas, ctx])

  return <Canvas ref={canvas} />
}

const parse = (val: any) => (Number.isFinite(val) ? val.toPrecision(2) : val.toString())

function MonitorLog({ objectOrFn }: ObjectProps) {
  const [val, set] = useState(parse(getValue(objectOrFn)))
  useEffect(() => {
    const timeout = setInterval(() => {
      set(parse(getValue(objectOrFn)))
    }, 30)
    return () => clearInterval(timeout)
  }, [objectOrFn])

  return <div>{val}</div>
}

export function Monitor({ valueKey, objectOrFn, settings }: MonitorProps) {
  return (
    <Row input>
      <Label>{valueKey}</Label>
      {settings.graph ? <MonitorCanvas objectOrFn={objectOrFn} /> : <MonitorLog objectOrFn={objectOrFn} />}
    </Row>
  )
}
