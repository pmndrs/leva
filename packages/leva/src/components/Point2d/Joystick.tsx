import React, { useState, useRef, useCallback, useEffect } from 'react'
import { useDrag } from 'react-use-gesture'
import { useSpring, a, config } from 'react-spring'
import { clamp } from '../../utils'
import { Point2d as Point2dType, Point2dObject } from '../../types'
import { JoystickTrigger, JoystickPlayground } from './StyledJoystick'
import { Point2dProps } from './Point2d'
import { useTh } from '../../styles'

type JoystickProps = { value: Point2dObject } & Pick<Point2dProps, 'settings' | 'onUpdate'>

export function Joystick({ value, settings, onUpdate }: JoystickProps) {
  const timeout = useRef<number | undefined>()
  const outOfBoundsX = useRef(0)
  const outOfBoundsY = useRef(0)

  const [{ x, y }, set] = useSpring(() => ({ x: 0, y: 0, config: config.stiff }))
  const [showJoystick, setShowJoystick] = useState(false)
  const [isOutOfBounds, setIsOutOfBounds] = useState(false)

  const {
    x: { step: stepX },
    y: { step: stepY },
  } = settings

  const wpx = useTh('sizes', '$joystickWidth')
  const hpx = useTh('sizes', '$joystickHeight')

  const w = (parseFloat(wpx) * 0.8) / 2
  const h = (parseFloat(hpx) * 0.8) / 2

  const startOutOfBounds = useCallback(() => {
    if (timeout.current) return
    setIsOutOfBounds(true)
    if (outOfBoundsX.current) x.start(outOfBoundsX.current * w)
    if (outOfBoundsY.current) y.start(outOfBoundsY.current * -h)
    timeout.current = window.setInterval(() => {
      onUpdate((v: Point2dType) => {
        const incX = stepX * outOfBoundsX.current * 3
        const incY = stepY * outOfBoundsY.current * 3
        return Array.isArray(v) ? [v[0] + incX, v[1] + incY] : { x: v.x + incX, y: v.y + incY }
      })
    }, 16)
  }, [x, w, y, h, onUpdate, stepX, stepY])

  const endOutOfBounds = useCallback(() => {
    window.clearTimeout(timeout.current)
    timeout.current = undefined
    setIsOutOfBounds(false)
  }, [])

  useEffect(() => () => window.clearTimeout(timeout.current), [])

  const bind = useDrag(({ active, delta: [dx, dy], movement: [mx, my] }) => {
    setShowJoystick(active)

    const _x = clamp(mx, -w, w)
    const _y = clamp(my, -h, h)

    outOfBoundsX.current = Math.abs(mx) > Math.abs(_x) ? Math.sign(mx - _x) : 0
    outOfBoundsY.current = Math.abs(my) > Math.abs(_y) ? Math.sign(_y - my) : 0

    let newX = value.x
    let newY = value.y

    if (active) {
      if (!outOfBoundsX.current) {
        newX += dx * stepX
        x.start(_x)
      }
      if (!outOfBoundsY.current) {
        newY -= dy * stepY
        y.start(_y)
      }
      if (outOfBoundsX.current || outOfBoundsY.current) startOutOfBounds()
      else endOutOfBounds()

      onUpdate({ x: newX, y: newY })
    } else {
      outOfBoundsX.current = 0
      outOfBoundsY.current = 0
      set({ x: 0, y: 0 })
      endOutOfBounds()
    }
  })

  return (
    <JoystickTrigger {...bind()}>
      {showJoystick && (
        <JoystickPlayground isOutOfBounds={isOutOfBounds}>
          <div />
          <a.span style={{ x, y }} />
        </JoystickPlayground>
      )}
    </JoystickTrigger>
  )
}
