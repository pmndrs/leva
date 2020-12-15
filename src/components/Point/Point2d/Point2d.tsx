import React, { useState } from 'react'
import { useDrag } from 'react-use-gesture'
import { useSpring, a, config } from 'react-spring'
import { PointCoordinates } from '../../PointCoordinates'
import { Point2d as Point2dType, InternalPoint2dSettings } from './point2d-plugin'
import { KEYS } from './point2d-plugin'
import { mapArrayToKeys } from '../../../utils'
import { TwixInputProps } from '../../../types'
import { Container, JoystickTrigger, Joystick } from './StyledPoint2d'
import { Row, Label } from '../../styles'
import { useThemeValue } from '../../../hooks'

type Point2dProps = TwixInputProps<Point2dType, InternalPoint2dSettings>

export function Point2d({ label, value, onUpdate, settings }: Point2dProps) {
  const _value = mapArrayToKeys(value, KEYS)
  const [spring, set] = useSpring(() => ({ x: 0, y: 0, config: config.stiff }))
  const [showJoystick, setShowJoystick] = useState(false)

  const w = parseInt(useThemeValue('size', 'joystick-width')) / 2
  const h = parseInt(useThemeValue('size', 'joystick-height')) / 2

  const bind = useDrag(
    ({ active, movement: [x, y], memo = _value }) => {
      setShowJoystick(active)
      set({ x: active ? x : 0, y: active ? y : 0 })
      onUpdate({ x: memo.x + x, y: memo.y - y })
      return memo
    },
    { bounds: { top: -h, bottom: h, left: -w, right: w } }
  )

  return (
    <Row input>
      <Label>{label}</Label>
      <Container>
        <JoystickTrigger {...bind()}>
          {showJoystick && (
            <Joystick>
              <a.div style={spring} />
            </Joystick>
          )}
        </JoystickTrigger>
        <PointCoordinates value={_value} settings={settings} onUpdate={onUpdate} />
      </Container>
    </Row>
  )
}
