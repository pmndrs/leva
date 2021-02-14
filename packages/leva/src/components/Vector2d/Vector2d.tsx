import React from 'react'
import { styled } from '../../styles'
import { Vector } from '../Vector'
import { InternalVector2dSettings } from './vector2d-plugin'
import { LevaInputProps, Vector2d, Vector2dObject } from '../../types'
import { Label, Row } from '../UI'
import { Joystick } from './Joystick'
import { useInputContext } from '../../context'

export type Vector2dProps = LevaInputProps<Vector2d, InternalVector2dSettings, Vector2dObject>

export const Container = styled('div', {
  display: 'grid',
  gridTemplateColumns: '$sizes$rowHeight repeat(2, 1fr)',
  columnGap: '$colGap',
})

export function Vector2dComponent() {
  const { label, displayValue, onUpdate, settings } = useInputContext<Vector2dProps>()
  return (
    <Row input>
      <Label>{label}</Label>
      <Container>
        <Joystick value={displayValue} settings={settings} onUpdate={onUpdate} />
        <Vector value={displayValue} settings={settings} onUpdate={onUpdate} />
      </Container>
    </Row>
  )
}
