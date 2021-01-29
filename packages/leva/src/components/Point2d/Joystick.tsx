import React, { useState, useRef, useCallback, useEffect } from 'react'
import { useTh } from '@xstyled/styled-components'
import { useDrag } from 'react-use-gesture'
import { clamp } from '../../utils'
import { Point2d as Point2dType, Point2dObject } from '../../types'
import { JoystickTrigger, JoystickPlayground } from './StyledJoystick'
import { Point2dProps } from './Point2d'
import { useRefTransform } from '../../helpers/useRefTransform';

type JoystickProps = { value: Point2dObject } & Pick<Point2dProps, 'settings' | 'onUpdate'>

export function Joystick({ value, settings, onUpdate }: JoystickProps) {
  const timeout = useRef<number | undefined>()
  const outOfBoundsX = useRef(0)
  const outOfBoundsY = useRef(0)

  const [showJoystick, setShowJoystick] = useState(false)
  const [isOutOfBounds, setIsOutOfBounds] = useState(false)

  const [dot, set] = useRefTransform<HTMLSpanElement>()

  const {
    x: { step: stepX },
    y: { step: stepY },
  } = settings

  const w = (useTh('sizes.joystick-width') * 0.8) / 2
  const h = (useTh('sizes.joystick-height') * 0.8) / 2

  const startOutOfBounds = useCallback(() => {

    if (timeout.current) return
    
    setIsOutOfBounds(true)

    // @ts-ignore
    set({ x: outOfBoundsX.current * w, y: outOfBoundsY.current * h })
    
    timeout.current = window.setInterval(() => {

      onUpdate((v: Point2dType) => {
        const incX = stepX * outOfBoundsX.current * 3
        const incY = stepY * outOfBoundsY.current * 3
        return Array.isArray(v) ? [v[0] + incX, v[1] + incY] : { x: v.x + incX, y: v.y + incY }
      })
      
    }, 16)
    
  }, [h, onUpdate, set, stepX, stepY, w])

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
      }
      
      if (!outOfBoundsY.current) {
        newY -= dy * stepY
      }
      
      set({ x: _x, y: _y})

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
          <span ref={dot} />
        </JoystickPlayground>
      )}
    </JoystickTrigger>
  )
}
