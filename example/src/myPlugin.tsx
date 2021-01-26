import React from 'react'
import { createPlugin, useInputContext } from '@leva/leva'
import { Row, Label, ValueInput } from '@leva/leva/components'
import { LevaInputProps } from '../../packages/leva/src/types'

type GreenOrBlueSettings = { alpha?: number }
type GreenOrBlueType = { color: string; light: boolean }
type GreenOrBlueInput = GreenOrBlueType & GreenOrBlueSettings

type GreenOrBlueProps = LevaInputProps<GreenOrBlueType, GreenOrBlueSettings>

function GreenOrBlue() {
  const props = useInputContext<GreenOrBlueProps>()
  const { label, displayValue, onUpdate, onChange, settings } = props
  const background = displayValue

  return (
    <Row input>
      <Label style={{ background, opacity: settings.alpha }}>{label}</Label>
      <ValueInput value={displayValue} onUpdate={onUpdate} onChange={onChange} />
    </Row>
  )
}

const normalize = ({ alpha, ...value }: GreenOrBlueInput) => {
  const settings: GreenOrBlueSettings = { alpha }
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
