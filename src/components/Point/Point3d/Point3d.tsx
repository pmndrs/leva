import React from 'react'
import styled from '@xstyled/styled-components'
import { TwixInputProps } from '../../../types'
import { PointCoordinates } from '../../PointCoordinates'
import { Row, Label } from '../../styles'
import { Point3d as Point3dType, KEYS, InternalPoint3dSettings } from './point3d-props'
import { mapArrayToKeys } from '../../../utils'

type Point3dProps = TwixInputProps<Point3dType, InternalPoint3dSettings>

const Container = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  grid-column-gap: col-gap;
`

export function Point3d({ label, value, onUpdate, settings }: Point3dProps) {
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
