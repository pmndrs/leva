import React from 'react'
import { Leva, useControls } from 'leva'
import { createPlugin, useInputContext, LevaInputProps, Components } from 'leva/plugin'

const { Row, Label, String } = Components

type GreenOrBlueSettings = { alpha?: number }
type GreenOrBlueType = { color?: string; light: boolean }
type GreenOrBlueInput = GreenOrBlueType & GreenOrBlueSettings

type GreenOrBlueProps = LevaInputProps<GreenOrBlueType, GreenOrBlueSettings, string>

function GreenOrBlue() {
  const props = useInputContext<GreenOrBlueProps>()
  const { label, displayValue, onUpdate, onChange, settings } = props
  const background = displayValue

  return (
    <Row input>
      <Label style={{ background, opacity: settings.alpha }}>{label}</Label>
      <String displayValue={displayValue} onUpdate={onUpdate} onChange={onChange} />
    </Row>
  )
}

const normalize = ({ color, light, alpha }: GreenOrBlueInput) => {
  return { value: { color, light }, settings: { alpha } }
}

const sanitize = (v: string): GreenOrBlueType => {
  if (!['green', 'blue', 'lightgreen', 'lightblue'].includes(v)) throw Error('Invalid value')
  // @ts-ignore
  const [, isLight, color] = v.match(/(light)?(.*)/)
  return { light: !!isLight, color }
}

const format = (v: GreenOrBlueType) => (v.light ? 'light' : '') + v.color

const greenOrBlue = createPlugin({
  sanitize,
  format,
  normalize,
  component: GreenOrBlue,
})

export default function App() {
  const data = useControls({
    myPlugin: greenOrBlue({ color: 'green', light: true, alpha: 0.5 }),
  })

  return (
    <>
      <Leva hideTitleBar />
      <pre>{JSON.stringify(data, null, '  ')}</pre>
    </>
  )
}
