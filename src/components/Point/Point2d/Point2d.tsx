import React, { useState, useRef, useCallback, useEffect } from 'react'
import { useDrag } from 'react-use-gesture'
import { useSpring, a, config } from 'react-spring'
import { PointCoordinates } from '../../PointCoordinates'
import { Point2d as Point2dType, InternalPoint2dSettings, KEYS } from './point2d-plugin'
import { mapArrayToKeys, clamp } from '../../../utils'
import { TwixInputProps } from '../../../types'
import { Container, JoystickTrigger, Joystick } from './StyledPoint2d'
import { Row, Label } from '../../styles'
import { useThemeValue } from '../../../hooks'

type Point2dProps = TwixInputProps<Point2dType, InternalPoint2dSettings>

export function Point2d({ label, value, onUpdate, settings }: Point2dProps) {
  const _value = mapArrayToKeys(value, KEYS)
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

  const w = (parseInt(useThemeValue('size', 'joystick-width')) * 0.8) / 2
  const h = (parseInt(useThemeValue('size', 'joystick-height')) * 0.8) / 2

  const startOutOfBounds = useCallback(() => {
    if (timeout.current) return
    setIsOutOfBounds(true)
    if (outOfBoundsX.current) x.start(outOfBoundsX.current * w)
    if (outOfBoundsY.current) y.start(outOfBoundsY.current * -h)
    timeout.current = setInterval(() => {
      onUpdate((v: Point2dType) => {
        const incX = stepX * outOfBoundsX.current * 3
        const incY = stepY * outOfBoundsY.current * 3
        return Array.isArray(v) ? [v[0] + incX, v[1] + incY] : { x: v.x + incX, y: v.y + incY }
      })
    }, 16)
  }, [onUpdate, stepX, stepY])

  const endOutOfBounds = useCallback(() => {
    clearTimeout(timeout.current)
    timeout.current = undefined
    setIsOutOfBounds(false)
  }, [])

  useEffect(() => () => clearTimeout(timeout.current), [])

  const bind = useDrag(({ active, delta: [dx, dy], movement: [mx, my] }) => {
    setShowJoystick(active)

    const _x = clamp(mx, -w, w)
    const _y = clamp(my, -h, h)

    outOfBoundsX.current = Math.abs(mx) > Math.abs(_x) ? Math.sign(mx - _x) : 0
    outOfBoundsY.current = Math.abs(my) > Math.abs(_y) ? Math.sign(_y - my) : 0

    let newX = _value.x
    let newY = _value.y

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
    <Row input>
      <Label>{label}</Label>
      <Container>
        <JoystickTrigger {...bind()}>
          {showJoystick && (
            <Joystick isOutOfBounds={isOutOfBounds}>
              <div />
              <a.span style={{ x, y }} />
            </Joystick>
          )}
        </JoystickTrigger>
        <PointCoordinates value={_value} settings={settings} onUpdate={onUpdate} />
      </Container>
    </Row>
  )
}
