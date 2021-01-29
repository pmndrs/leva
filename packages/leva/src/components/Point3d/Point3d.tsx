import React from 'react'
import { styled } from '../../styles'
import { LevaInputProps, Point3d as Point3dType, Point3dObject } from '../../types'
import { Vector } from '../Vector'
import { Label, Row } from '../UI'
import { InternalPoint3dSettings } from './point3d-plugin'
import { useInputContext } from '../../hooks'

type Point3dProps = LevaInputProps<Point3dType, InternalPoint3dSettings, Point3dObject>

export const Container = styled('div', {
  display: 'grid',
  gridTemplateColumns: 'repeat(3, 1fr)',
  gridColumnGap: '$colGap',
})

export function Point3d() {
  const { label, displayValue, onUpdate, settings } = useInputContext<Point3dProps>()
  return (
    <Row input>
      <Label>{label}</Label>
      <Container>
        <Vector value={displayValue} settings={settings} onUpdate={onUpdate} />
      </Container>
    </Row>
  )
}
