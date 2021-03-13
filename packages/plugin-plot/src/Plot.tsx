import React from 'react'
import { useInputContext, Label, Row, String } from 'leva/plugin'
import { PlotCanvas } from './PlotCanvas'
import type { PlotProps } from './plot-types'

export function Plot() {
  const { label, displayValue, onUpdate, onChange } = useInputContext<PlotProps>()

  return (
    <>
      <Row>
        <PlotCanvas />
      </Row>
      <Row input>
        <Label>{label}</Label>
        <String value={displayValue} onUpdate={onUpdate} onChange={onChange} />
      </Row>
    </>
  )
}
