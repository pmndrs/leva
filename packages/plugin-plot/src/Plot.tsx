import { useEffect, useRef } from 'react'
import { useInputContext, useValues, Components } from 'leva/plugin'
import { PlotCanvas } from './PlotCanvas'
import type { PlotProps } from './plot-types'
import { SyledInnerLabel, Container } from './StyledPlot'

const { Label, Row, String } = Components

export function Plot() {
  const { label, value, displayValue, settings, onUpdate, onChange, setSettings } = useInputContext<PlotProps>()

  const { graph } = settings

  const scope = useValues(value.__symbols)
  const displayRef = useRef(displayValue)
  displayRef.current = displayValue

  useEffect(() => {
    // recomputes when scope which holds the values of the symbols change
    onUpdate(displayRef.current)
  }, [scope, onUpdate])

  return (
    <>
      {graph && (
        <Row>
          <PlotCanvas value={value} settings={settings} />
        </Row>
      )}
      <Row input>
        <Label>{label}</Label>
        <Container>
          <SyledInnerLabel graph={graph} onClick={() => setSettings({ graph: !graph })}>
            𝑓
          </SyledInnerLabel>
          <String displayValue={displayValue} onUpdate={onUpdate} onChange={onChange} />
        </Container>
      </Row>
    </>
  )
}
