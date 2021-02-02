import React from 'react'
import { Vector, Label, Row, styled } from 'leva/plugins'
import { SpringCanvas, SpringProps } from './SpringCanvas'

const Container = styled('div', {
  display: 'grid',
  gridTemplateColumns: 'repeat(3, 1fr)',
  gridColumnGap: '$colGap',
})

export function Spring(props: SpringProps) {
  const { value, valueKey, label, displayValue, onUpdate, settings } = props
  return (
    <>
      <Row>
        <SpringCanvas {...props} />
      </Row>
      <Row input>
        <Label value={value} valueKey={valueKey}>
          {label}
        </Label>
        <Container>
          <Vector value={displayValue} settings={settings} onUpdate={onUpdate} />
        </Container>
      </Row>
    </>
  )
}
