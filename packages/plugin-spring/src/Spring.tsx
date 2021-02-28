import React from 'react'
import { useInputContext, Vector, Label, Row } from 'leva/plugins'
import { SpringCanvas, SpringProps } from './SpringCanvas'

export function Spring() {
  const { label, displayValue, onUpdate, settings } = useInputContext<SpringProps>()

  return (
    <>
      <Row>
        <SpringCanvas />
      </Row>
      <Row input>
        <Label>{label}</Label>
        <Vector value={displayValue} settings={settings as any} onUpdate={onUpdate} />
      </Row>
    </>
  )
}
