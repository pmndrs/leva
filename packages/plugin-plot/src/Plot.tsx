import React, { useEffect, useRef } from 'react'
import { useInputContext, useValues, Components } from 'leva/plugin'
import { PlotCanvas } from './PlotCanvas'
import type { PlotProps } from './plot-types'

const { Label, Row, String } = Components

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
      {settings.graph && (
        <Row>
          <PlotCanvas value={value} settings={settings} />
        </Row>
      )}
      <Row input>
        <Label>{label}</Label>
        <String displayValue={displayValue} onUpdate={onUpdate} onChange={onChange} innerLabel="𝑓" />
      </Row>
    </>
  )
}
