import React from 'react'
import styled from '@xstyled/styled-components'
import { TwixInputProps } from '../../types'
import { PointCoordinates } from '../PointCoordinates'
import { Row, Label } from '../styles'
import { Point3d as Point3dType, Point3dSettings } from './point3d-props'

type Point3dProps = TwixInputProps<Point3dType, Point3dSettings>

const Container = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  grid-column-gap: col-gap;
`

export function Point3d({ label, value, onUpdate, settings }: Point3dProps) {
  return (
    <Row input>
      <Label>{label}</Label>
      <Container>
        <PointCoordinates value={value} settings={settings} onUpdate={onUpdate} />
      </Container>
    </Row>
  )
}
