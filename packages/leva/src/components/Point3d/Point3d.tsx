import React from 'react'
import { styled } from '../../styles'
import { LevaInputProps, Point3d, Point3dObject } from '../../types'
import { Vector } from '../Vector'
import { Label, Row } from '../UI'
import { InternalPoint3dSettings } from './point3d-plugin'

type Point3dProps = LevaInputProps<Point3d, InternalPoint3dSettings, Point3dObject>

export const Container = styled('div', {
  display: 'grid',
  gridTemplateColumns: 'repeat(3, 1fr)',
  gridColumnGap: '$colGap',
})

export function Point3dComponent({ value, valueKey, label, displayValue, onUpdate, settings }: Point3dProps) {
  return (
    <Row input>
      <Label value={value} valueKey={valueKey}>
        {label}
      </Label>
      <Container>
        <Vector value={displayValue} settings={settings} onUpdate={onUpdate} />
      </Container>
    </Row>
  )
}
