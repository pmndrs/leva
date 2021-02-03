import React, { useRef, useEffect, useCallback, useMemo } from 'react'
import { a, useSpring } from 'react-spring'
import tc from 'tinycolor2'

import { LevaInputProps, useCanvas2d, useDrag, useInputContext } from 'leva/plugins'
import { debounce } from 'leva/utilities'
import { useTh } from 'leva/plugins'

import { Canvas, SpringPreview } from './StyledSpring'
import { InternalSpring, InternalSpringSettings } from './spring-plugin'
import { springFn } from './math'

const SpringPreviewAnimated = a(SpringPreview)

export type SpringProps = LevaInputProps<InternalSpring, InternalSpringSettings>

export function SpringCanvas() {
  const { displayValue, value, onUpdate, onChange, settings } = useInputContext<SpringProps>()

  const springRef = useRef(displayValue)
  const accentColor = useTh('colors', '$highlight3')
  const fillColor = useTh('colors', '$highlight1')

  const [gradientTop, gradientBottom] = useMemo(() => {
    return [tc(fillColor).setAlpha(0.4).toRgbString(), tc(fillColor).setAlpha(0.1).toRgbString()]
  }, [fillColor])

  const { tension, friction, mass = 1 } = displayValue
  const { tension: ts, friction: fs } = settings!

  const [spring, set] = useSpring(() => ({
    scaleX: 0.5,
    opacity: 0.2,
    immediate: (k) => k === 'opacity',
  }))

  const bind = useDrag(({ movement: [x, y], memo = [tension, friction] }) => {
    onChange({ ...value, tension: memo[0] - Math.round(x) * ts!.step!, friction: memo[1] - Math.round(y) * fs!.step! })
    return memo
  })

  const updateSpring = useMemo(
    () =>
      debounce(() => {
        const { tension, friction, mass } = springRef.current
        onUpdate(springRef.current)
        set({
          from: { scaleX: 0, opacity: 0.9 },
          to: [{ scaleX: 0.5 }, { opacity: 0.2 }],
          config: { friction, tension, mass },
        })
      }, 250),
    [set, onUpdate]
  )

  const drawSpring = useCallback(
    (_canvas: HTMLCanvasElement, _ctx: CanvasRenderingContext2D) => {
      const { tension, friction, mass } = springRef.current
      const { width, height } = _canvas
      const t = springFn(tension, friction, mass)
      _ctx.clearRect(0, 0, width, height)
      _ctx.beginPath()
      let max = 0
      for (let i = 0; i < width; i++) {
        const v = (t(i * 8) * height) / 2
        max = Math.max(max, v)
        _ctx.lineTo(i, height - v)
      }

      const gradient = _ctx.createLinearGradient(0, max, 0, height)
      gradient.addColorStop(0.0, gradientTop)
      gradient.addColorStop(1.0, gradientBottom)
      _ctx.fillStyle = gradient
      _ctx.strokeStyle = accentColor
      _ctx.lineWidth = 2

      _ctx.stroke()
      _ctx.lineTo(width - 1, height)
      _ctx.lineTo(0, height)
      _ctx.fill()
    },
    [accentColor, gradientTop, gradientBottom]
  )

  const [canvas, ctx] = useCanvas2d(drawSpring)

  useEffect(() => {
    springRef.current = { tension, friction, mass }
    drawSpring(canvas.current!, ctx.current!)
    updateSpring()
  }, [drawSpring, updateSpring, tension, friction, mass, canvas, ctx])

  return (
    <>
      <Canvas {...bind()} ref={canvas} />
      <SpringPreviewAnimated style={spring as any} />
    </>
  )
}
