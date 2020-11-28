import React from 'react'
import styled from '@xstyled/styled-components'
import { TwixInputProps } from '../../../types'
import { PointCoordinates } from '../../PointCoordinates'
import { Row, Label } from '../../styles'
import { Point2d as Point2dType, Point2dSettings } from './point2d-props'
import { mapArrayToKeys } from '../../../utils'
import { KEYS } from '../Point3d/point3d-props'

type Point2dProps = TwixInputProps<Point2dType, Point2dSettings>

const Container = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  grid-column-gap: col-gap;
`

export function Point2d({ label, value, onUpdate, settings }: Point2dProps) {
  const _value = mapArrayToKeys(value, KEYS)
  return (
    <Row input>
      <Label>{label}</Label>
      <Container>
        <PointCoordinates value={_value} settings={settings} onUpdate={onUpdate} />
      </Container>
    </Row>
  )
}
