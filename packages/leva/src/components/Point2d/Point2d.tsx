import React from 'react'
import { styled } from '../../styles'
import { Vector } from '../Vector'
import { InternalPoint2dSettings } from './point2d-plugin'
import { LevaInputProps, Point2d, Point2dObject } from '../../types'
import { Label, Row } from '../UI'
import { Joystick } from './Joystick'

export type Point2dProps = LevaInputProps<Point2d, InternalPoint2dSettings, Point2dObject>

export const Container = styled('div', {
  display: 'grid',
  gridTemplateColumns: 'var(--sizes-rowHeight) repeat(2, 1fr)',
  gridColumnGap: '$colGap',
})

export function Point2dComponent({ value, valueKey, label, displayValue, onUpdate, settings }: Point2dProps) {
  return (
    <Row input>
      <Label value={value} valueKey={valueKey}>
        {label}
      </Label>
      <Container>
        <Joystick value={displayValue} settings={settings} onUpdate={onUpdate} />
        <Vector value={displayValue} settings={settings} onUpdate={onUpdate} />
      </Container>
    </Row>
  )
}
