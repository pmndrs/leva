import React from 'react'
import { styled } from '../../styles'
import { LevaInputProps, Point3d, Point3dObject } from '../../types'
import { Vector } from '../Vector'
import { Label, Row } from '../UI'
import { InternalPoint3dSettings } from './point3d-plugin'
import { useInputContext } from '../../context'

type Point3dProps = LevaInputProps<Point3d, InternalPoint3dSettings, Point3dObject>

export const Container = styled('div', {
  display: 'grid',
  gridTemplateColumns: 'repeat(3, 1fr)',
  columnGap: '$colGap',
})

export function Point3dComponent() {
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
