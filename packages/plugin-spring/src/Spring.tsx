import React from 'react'
import { useInputContext, Vector, Label, Row } from 'leva/plugin'
import { SpringCanvas } from './SpringCanvas'
import type { SpringProps } from './spring-types'

export function Spring() {
  const { label, displayValue, onUpdate, settings } = useInputContext<SpringProps>()

  return (
    <>
      <Row>
        <SpringCanvas />
      </Row>
      <Row input>
        <Label>{label}</Label>
        <Vector value={displayValue} settings={settings} onUpdate={onUpdate} />
      </Row>
    </>
  )
}
