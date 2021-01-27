import React from 'react'
import styled from '@xstyled/styled-components'
import { th } from '@xstyled/system'
import { Vector } from '../Vector'
import { InternalPoint2dSettings } from './point2d-plugin'
import { LevaInputProps, Point2d as Point2dType, Point2dObject } from '../../types'
import { Label, Row } from '../UI'
import { Joystick } from './Joystick'
import { useInputContext } from '../../hooks'

export type Point2dProps = LevaInputProps<Point2dType, InternalPoint2dSettings, Point2dObject>

export const Container = styled.div`
  display: grid;
  grid-template-columns: ${th.size('row-height')} repeat(2, 1fr);
  grid-column-gap: col-gap;
`

export function Point2d() {
  const { label, displayValue, onUpdate, settings } = useInputContext<Point2dProps>()
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
