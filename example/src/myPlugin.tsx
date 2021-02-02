import React from 'react'
import { createPlugin, InputWithSettings, LevaInputProps, Row, Label, ValueInput } from 'leva/plugins'

type GreenOrBlueSettings = { alpha?: number }
type GreenOrBlueType = { color: string; light: boolean }
type GreenOrBlueInput = InputWithSettings<GreenOrBlueType, GreenOrBlueSettings>

type GreenOrBlueProps = LevaInputProps<GreenOrBlueType, GreenOrBlueSettings>

function GreenOrBlue(props: GreenOrBlueProps) {
  const { value, valueKey, label, displayValue, onUpdate, onChange, settings } = props
  const background = displayValue

  return (
    <Row input>
      <Label value={value} valueKey={valueKey} style={{ background, opacity: settings.alpha }}>
        {label}
      </Label>
      <ValueInput value={displayValue} onUpdate={onUpdate} onChange={onChange} />
    </Row>
  )
}

const normalize = ({ value, ...settings }: GreenOrBlueInput) => {
  return { value, settings }
}

const sanitize = (v: string): GreenOrBlueType => {
  // @ts-ignore
  const [, isLight, color] = v.match(/(light)?(.*)/)
  return { light: !!isLight, color }
}

const format = (v: GreenOrBlueType) => (v.light ? 'light' : '') + v.color

export const greenOrBlue = createPlugin({
  validate: (v) => ['green', 'blue', 'lightgreen', 'lightblue'].includes(v),
  sanitize,
  format,
  normalize,
  component: GreenOrBlue,
})
