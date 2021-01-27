import React from 'react'
import styled from '@xstyled/styled-components'
import { useInputContext, Vector, Label, Row } from '@leva/leva/plugins'
import { SpringCanvas, SpringProps } from './SpringCanvas'

const Container = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  grid-column-gap: col-gap;
`

export function Spring() {
  const { label, displayValue, onUpdate, settings } = useInputContext<SpringProps>()

  return (
    <>
      <Row>
        <SpringCanvas />
      </Row>
      <Row input>
        <Label>{label}</Label>
        <Container>
          <Vector value={displayValue} settings={settings} onUpdate={onUpdate} />
        </Container>
      </Row>
    </>
  )
}
