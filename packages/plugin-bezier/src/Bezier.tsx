import React, { useMemo } from 'react'
import { useInputContext, useInputSetters, Components } from 'leva/plugin'
import { BezierSvg } from './BezierSvg'
import type { BezierProps } from './bezier-types'
import { BezierPreview } from './BezierPreview'

const { Label, Row, Vector, Select } = Components

const optionSelect = {
  custom: false,
  ease: [0.25, 0.1, 0.25, 1].toString(),
  linear: [0, 0, 1, 1].toString(),
  'ease-in': [0.42, 0, 1, 1].toString(),
  'ease-out': [0, 0, 0.58, 1].toString(),
  'ease-in-out': [0.42, 0, 0.58, 1].toString(),
  'in-out-sine': [0.45, 0.05, 0.55, 0.95].toString(),
  'in-out-quadratic': [0.46, 0.03, 0.52, 0.96].toString(),
  'in-out-cubic': [0.65, 0.05, 0.36, 1].toString(),
  'fast-out-slow-in': [0.4, 0, 0.2, 1].toString(),
  'in-out-back': [0.68, -0.55, 0.27, 1.55].toString(),
}

const optionKeys = Object.keys(optionSelect)
const optionValues = Object.values(optionSelect)
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
  const { label, value, displayValue, settings, onUpdate } = useInputContext<BezierProps>()

  return (
    <>
      <Row input>
        <Label align="top">{label}</Label>
        <SelectBezier value={value} onUpdate={onUpdate} />
      </Row>
      <Row>
        <BezierSvg displayValue={displayValue} onUpdate={onUpdate} />
        <BezierPreview value={value} />
        <Vector value={displayValue} settings={settings} onUpdate={onUpdate} innerLabelTrim={2} />
      </Row>
    </>
  )
}
