import React, { useState, useRef, useCallback, useEffect, useLayoutEffect } from 'react'
import { useDrag } from 'react-use-gesture'
import { clamp } from '../../utils'
import { JoystickTrigger, JoystickPlayground } from './StyledJoystick'
import { Vector2dProps } from './Vector2d'
import { useTh } from '../../styles'
import { Portal } from '../UI'
import { multiplyStep, useTransform } from '../../utils/hooks'
import { Vector2d as Vector2dType, Vector2dObject } from '../../types'

type JoystickProps = { value: Vector2dObject } & Pick<Vector2dProps, 'settings' | 'onUpdate'>

export function Joystick({ value, settings, onUpdate }: JoystickProps) {
  const timeout = useRef<number | undefined>()
  const outOfBoundsX = useRef(0)
  const outOfBoundsY = useRef(0)
  const stepMultiplier = useRef(1)

  const [joystickShown, setShowJoystick] = useState(false)
  const [isOutOfBounds, setIsOutOfBounds] = useState(false)

  const [spanRef, set] = useTransform<HTMLSpanElement>()

  const joystickeRef = useRef<HTMLDivElement>(null)
  const playgroundRef = useRef<HTMLDivElement>(null)

  useLayoutEffect(() => {
    if (joystickShown) {
      const { top, left, width, height } = joystickeRef.current!.getBoundingClientRect()
      playgroundRef.current!.style.left = left + width / 2 + 'px'
      playgroundRef.current!.style.top = top + height / 2 + 'px'
    }
  }, [joystickShown])

  const {
    x: { step: stepX },
    y: { step: stepY },
  } = settings

  const wpx = useTh('sizes', 'joystickWidth')
  const hpx = useTh('sizes', 'joystickHeight')

  const w = (parseFloat(wpx) * 0.8) / 2
  const h = (parseFloat(hpx) * 0.8) / 2

  const startOutOfBounds = useCallback(() => {
    if (timeout.current) return
    setIsOutOfBounds(true)
    if (outOfBoundsX.current) set({ x: outOfBoundsX.current * w })
    if (outOfBoundsY.current) set({ y: outOfBoundsY.current * -h })
    timeout.current = window.setInterval(() => {
      onUpdate((v: Vector2dType) => {
        const incX = stepX * outOfBoundsX.current * stepMultiplier.current
        const incY = stepY * outOfBoundsY.current * stepMultiplier.current
        return Array.isArray(v) ? { x: v[0] + incX, y: v[1] + incY } : { x: v.x + incX, y: v.y + incY }
      })
    }, 16)
  }, [w, h, onUpdate, set, stepX, stepY])

  const endOutOfBounds = useCallback(() => {
    window.clearTimeout(timeout.current)
    timeout.current = undefined
    setIsOutOfBounds(false)
  }, [])

  useEffect(() => {
    function setStepMultiplier(event: KeyboardEvent) {
      stepMultiplier.current = multiplyStep(event)
    }
    window.addEventListener('keydown', setStepMultiplier)
    window.addEventListener('keyup', setStepMultiplier)
    return () => {
      window.clearTimeout(timeout.current)
      window.removeEventListener('keydown', setStepMultiplier)
      window.removeEventListener('keyup', setStepMultiplier)
    }
  }, [])

  const bind = useDrag(({ first, active, delta: [dx, dy], movement: [mx, my] }) => {
    if (first) setShowJoystick(true)

    const _x = clamp(mx, -w, w)
    const _y = clamp(my, -h, h)

    outOfBoundsX.current = Math.abs(mx) > Math.abs(_x) ? Math.sign(mx - _x) : 0
    outOfBoundsY.current = Math.abs(my) > Math.abs(_y) ? Math.sign(_y - my) : 0

    let newX = value.x
    let newY = value.y

    if (active) {
      if (!outOfBoundsX.current) {
        newX += dx * stepX * stepMultiplier.current
        set({ x: _x })
      }
      if (!outOfBoundsY.current) {
        newY -= dy * stepY * stepMultiplier.current
        set({ y: _y })
      }
      if (outOfBoundsX.current || outOfBoundsY.current) startOutOfBounds()
      else endOutOfBounds()

      onUpdate({ x: newX, y: newY })
    } else {
      setShowJoystick(false)
      outOfBoundsX.current = 0
      outOfBoundsY.current = 0
      set({ x: 0, y: 0 })
      endOutOfBounds()
    }
  })

  return (
    <JoystickTrigger ref={joystickeRef} {...bind()}>
      {joystickShown && (
        <Portal>
          <JoystickPlayground ref={playgroundRef} isOutOfBounds={isOutOfBounds}>
            <div />
            <span ref={spanRef} />
          </JoystickPlayground>
        </Portal>
      )}
    </JoystickTrigger>
  )
}
