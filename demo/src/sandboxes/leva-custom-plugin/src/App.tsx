import React from 'react'
import { Leva, useControls } from 'leva'
import { createPlugin, useInputContext, LevaInputProps, Row, Label, ValueInput } from 'leva/plugins'

type GreenOrBlueSettings = { alpha?: number }
type GreenOrBlueType = { color?: string; light: boolean }
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

const normalize = ({ color, light, alpha }: GreenOrBlueInput) => {
  return { value: { color, light }, settings: { alpha } }
}

const sanitize = (v: string): GreenOrBlueType => {
  // @ts-ignore
  const [, isLight, color] = v.match(/(light)?(.*)/)
  return { light: !!isLight, color }
}

const format = (v: GreenOrBlueType) => (v.light ? 'light' : '') + v.color

const greenOrBlue = createPlugin({
  validate: (v: any) => ['green', 'blue', 'lightgreen', 'lightblue'].includes(v),
  sanitize,
  format,
  normalize,
  component: GreenOrBlue,
})

export default function App() {
  const data = useControls({
    first: { value: 0, min: -10, max: 10 },
    myPlugin: greenOrBlue({ color: 'green', light: true, alpha: 0.5 }),
  })

  return (
    <>
      <Leva hideTitleBar />
      <pre>{JSON.stringify(data, null, '  ')}</pre>
    </>
  )
}
