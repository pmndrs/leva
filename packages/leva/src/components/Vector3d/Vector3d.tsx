import React from 'react'
import { styled } from '../../styles'
import { LevaInputProps, Vector3d, Vector3dObject } from '../../types'
import { Vector } from '../Vector'
import { Label, Row } from '../UI'
import { InternalVector3dSettings } from './vector3d-plugin'
import { useInputContext } from '../../context'

type Vector3dProps = LevaInputProps<Vector3d, InternalVector3dSettings, Vector3dObject>

export const Container = styled('div', {
  display: 'grid',
  gridTemplateColumns: 'repeat(3, 1fr)',
  columnGap: '$colGap',
})

export function Vector3dComponent() {
  const { label, displayValue, onUpdate, settings } = useInputContext<Vector3dProps>()
  return (
    <Row input>
      <Label>{label}</Label>
      <Container>
        <Vector value={displayValue} settings={settings} onUpdate={onUpdate} />
      </Container>
    </Row>
  )
}
