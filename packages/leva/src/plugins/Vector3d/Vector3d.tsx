import React from 'react'
import { Vector } from '../Vector'
import { Label, Row, Joystick3d } from '../../components/UI'
import { useInputContext } from '../../context'
import type { Vector3dProps } from './vector3d-types'
import { Container } from '../Vector2d/Vector2d'

export function Vector3dComponent() {
  const { label, displayValue, onUpdate, settings } = useInputContext<Vector3dProps>()
  return (
    <Row input>
      <Label>{label}</Label>
      <Container withJoystick={!!settings.joystick}>
        {settings.joystick && <Joystick3d value={displayValue} settings={settings} onUpdate={onUpdate} />}
        <Vector value={displayValue} settings={settings} onUpdate={onUpdate} />
      </Container>
    </Row>
  )
}
