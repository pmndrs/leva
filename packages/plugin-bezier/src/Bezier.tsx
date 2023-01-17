import { useMemo } from 'react'
import { useInputContext, useInputSetters, Components } from 'leva/plugin'

import { BezierSvg } from './BezierSvg'
import { BezierPreview } from './BezierPreview'
import { Container, SyledInnerLabel } from './StyledBezier'
import { BuiltIn } from './bezier-plugin'

import type { BezierProps } from './bezier-types'

const { Label, Row, Vector, Select } = Components

const optionKeys = ['custom', ...Object.keys(BuiltIn)]
const optionValues = [false, ...Object.values(BuiltIn).map((c) => c.toString())]
const selectSettings = { keys: optionKeys, values: optionValues }

function SelectBezier({ value, onUpdate }: Pick<BezierProps, 'value' | 'onUpdate'>) {
  const selectValue = useMemo(() => optionValues.find((v) => v === value.toString()) || false, [value])
  const args = { type: 'SELECT', value: selectValue, settings: selectSettings }
  const setValue = (newValue: string | boolean) => newValue && onUpdate((newValue as string).split(','))
  const select = useInputSetters({ ...args, setValue })
  return (
    <Select
      value={selectValue}
      displayValue={select.displayValue}
      onUpdate={select.onUpdate}
      settings={selectSettings}
    />
  )
}

export function Bezier() {
  const { label, value, displayValue, settings, onUpdate, setSettings } = useInputContext<BezierProps>()
  const { graph, preview } = settings

  return (
    <>
      <Row input>
        <Label>{label}</Label>
        <Container>
          <SyledInnerLabel graph={graph} onClick={() => setSettings({ graph: !graph })}>
            𝑓
          </SyledInnerLabel>
          <SelectBezier value={value} onUpdate={onUpdate} />
        </Container>
      </Row>
      {graph && <BezierSvg displayValue={displayValue} onUpdate={onUpdate} withPreview={preview} />}
      {preview && (
        <Row>
          <BezierPreview value={value} />
        </Row>
      )}
      {graph && (
        <Row>
          <Vector value={displayValue} settings={settings} onUpdate={onUpdate} innerLabelTrim={2} />
        </Row>
      )}
    </>
  )
}
