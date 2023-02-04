import React from 'react'
import { Components, useInputContext, styled } from 'leva/plugin'
import { Joystick3d } from './UI/Joystick3d'
import type { Vector3jProps } from './vector3j-types'

const { Label, Row, Vector } = Components

const Container = styled('div', {
  display: 'grid',
  columnGap: '$colGap',
  variants: {
    withJoystick: {
      true: { gridTemplateColumns: '$sizes$rowHeight auto' },
      false: { gridTemplateColumns: 'auto' },
    },
  },
})

export function Vector3j() {
  const { label, displayValue, onUpdate, settings } = useInputContext<Vector3jProps>()
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
