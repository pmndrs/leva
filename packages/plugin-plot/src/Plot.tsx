import React, { useEffect, useRef } from 'react'
import { useInputContext, Label, Row, String, useValues } from 'leva/plugin'

import { PlotCanvas } from './PlotCanvas'
import type { PlotProps } from './plot-types'

export function Plot() {
  const { label, value, displayValue, settings, onUpdate, onChange } = useInputContext<PlotProps>()

  const scope = useValues(value.__symbols)
  const displayRef = useRef(displayValue)
  displayRef.current = displayValue

  useEffect(() => {
    // recomputes when scope which holds the values of the symbols change
    onUpdate(displayRef.current)
  }, [scope, onUpdate])

  return (
    <>
      <Row>
        <PlotCanvas value={value} settings={settings} />
      </Row>
      <Row input>
        <Label>{label}</Label>
        <String value={displayValue} onUpdate={onUpdate} onChange={onChange} />
      </Row>
    </>
  )
}
