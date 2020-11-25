import React from 'react'
import styled from '@xstyled/styled-components'
import { PointCoordinates } from '../PointCoordinates'
import { Spring as SpringType, SpringSettings } from './spring-props'
import { Row, Label } from '../styles'
import { TwixInputProps } from '../../types'

type SpringProps = TwixInputProps<SpringType, SpringSettings>

const Container = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  grid-column-gap: col-gap;
`

export function Spring({ label, value, onUpdate, settings }: SpringProps) {
  return (
    <Row grid>
      <Label>{label}</Label>
      <Container>
        <PointCoordinates value={value} settings={settings} onUpdate={onUpdate} />
      </Container>
    </Row>
  )
}
