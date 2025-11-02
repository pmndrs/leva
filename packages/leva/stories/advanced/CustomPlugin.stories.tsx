import React from 'react'
import Reset from '../components/decorator-reset'
import { Meta } from '@storybook/react'
import { useControls, Leva } from '../../src'
import { createPlugin, Components } from '../../src/plugin/index'
import { useInputContext } from '../../src/context'
import type { LevaInputProps } from '../../src/types/public'

export default {
  title: 'Advanced/Custom Plugin',
  decorators: [Reset],
} as Meta

type GreenOrBlueSettings = { alpha?: number }
type GreenOrBlueType = { color?: string; light: boolean }
type GreenOrBlueInput = GreenOrBlueType & GreenOrBlueSettings

type GreenOrBlueProps = LevaInputProps<GreenOrBlueType, GreenOrBlueSettings, string>

function GreenOrBlue() {
  const { Row, Label, String } = Components
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

export const Default = () => {
  const data = useControls({
    myPlugin: greenOrBlue({ color: 'green', light: true, alpha: 0.5 }),
  })

  return (
    <>
      <Leva titleBar={false} />
      <pre>{JSON.stringify(data, null, '  ')}</pre>
    </>
  )
}
