import React from 'react'
import { styled } from '../../styles'
import { InternalVectorSettings, Vector } from '../Vector'
import { LevaInputProps, Vector2d, Vector as VectorType } from '../../types'
import { Label, Row } from '../UI'
import { Joystick } from './Joystick'
import { useInputContext } from '../../context'

export type InternalVector2dSettings = InternalVectorSettings<string, [string, string]>
export type Vector2dProps = LevaInputProps<Vector2d, InternalVector2dSettings, VectorType>

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
