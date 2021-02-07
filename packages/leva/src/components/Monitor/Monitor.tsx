import React, { useState, useEffect, useCallback, useMemo, useRef, forwardRef, useImperativeHandle } from 'react'
import tc from 'tinycolor2'
import { Canvas } from './StyledMonitor'
import { Label, Row } from '../UI'
import { range } from '../../utils'
import { useCanvas2d } from '../../utils/hooks'
import { MonitorInput } from '../../types/'
import { useTh } from '../../styles'

type MonitorProps = { valueKey: string } & Omit<MonitorInput, 'type'>
type ObjectProps = { initialValue: any }

const POINTS = 100

function push(arr: any[], val: any) {
  arr.push(val)
  if (arr.length > POINTS) arr.shift()
}

const MonitorCanvas = forwardRef(function ({ initialValue }: ObjectProps, ref) {
  const accentColor = useTh('colors', '$highlight3')
  const fillColor = useTh('colors', '$highlight1')

  const [gradientTop, gradientBottom] = useMemo(() => {
    return [tc(fillColor).setAlpha(0.4).toRgbString(), tc(fillColor).setAlpha(0.1).toRgbString()]
  }, [fillColor])

  const points = useRef([initialValue])
  const min = useRef(initialValue)
  const max = useRef(initialValue)
  const raf = useRef<number | undefined>()

  const drawPlot = useCallback(
    (_canvas: HTMLCanvasElement, _ctx: CanvasRenderingContext2D) => {
      // fixes unmount potential bug
      if (!_canvas) return
      const { width, height } = _canvas
      _ctx.clearRect(0, 0, width, height)
      _ctx.beginPath()
      const interval = width / POINTS
      for (let i = 0; i < points.current.length; i++) {
        const p = range(points.current[i], min.current!, max.current!)
        _ctx.lineTo(interval * i, p * height * 0.9)
      }

      const gradient = _ctx.createLinearGradient(0, 0, 0, height)
      gradient.addColorStop(0.0, gradientTop)
      gradient.addColorStop(1.0, gradientBottom)
      _ctx.fillStyle = gradient
      _ctx.strokeStyle = accentColor
      _ctx.lineWidth = 2

      _ctx.stroke()
      _ctx.lineTo(interval * (points.current.length + 1), height)
      _ctx.lineTo(0, height)
      _ctx.lineTo(0, 0)
      _ctx.fill()
    },
    [accentColor, gradientTop, gradientBottom]
  )

  const [canvas, ctx] = useCanvas2d(drawPlot)

  useImperativeHandle(
    ref,
    () => ({
      frame: (val: any) => {
        if (min.current === undefined || val < min.current) min.current = val
        if (max.current === undefined || val > max.current) max.current = val
        push(points.current, val)
        raf.current = requestAnimationFrame(() => drawPlot(canvas.current!, ctx.current!))
      },
    }),
    [canvas, ctx, drawPlot]
  )

  useEffect(() => () => cancelAnimationFrame(raf.current!), [])

  return <Canvas ref={canvas} />
})

const parse = (val: any) => (Number.isFinite(val) ? val.toPrecision(2) : val.toString())

const MonitorLog = forwardRef(function ({ initialValue }: ObjectProps, ref) {
  const [val, set] = useState(parse(initialValue))
  useImperativeHandle(ref, () => ({ frame: (v: any) => set(parse(v)) }), [])
  return <div>{val}</div>
})

function getValue(o: React.MutableRefObject<any> | Function) {
  return typeof o === 'function' ? o() : o.current
}

export function Monitor({ valueKey, objectOrFn, settings }: MonitorProps) {
  const ref = useRef<any>()
  const initialValue = useRef(getValue(objectOrFn))

  useEffect(() => {
    const timeout = window.setInterval(() => ref.current?.frame(getValue(objectOrFn)), settings.interval)
    return () => window.clearInterval(timeout)
  }, [objectOrFn, settings.interval])

  return (
    <Row input>
      <Label align="top">{valueKey}</Label>
      {settings.graph ? (
        <MonitorCanvas ref={ref} initialValue={initialValue.current} />
      ) : (
        <MonitorLog ref={ref} initialValue={initialValue.current} />
      )}
    </Row>
  )
}
