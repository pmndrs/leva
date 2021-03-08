import React from 'react'
import { Story, Meta } from '@storybook/react'
import Reset from '../components/decorator-reset'

import { useControls } from '../../src'

type Color = { r: number; g: number; b: number; a?: number }

export default {
  title: 'Inputs/Color',
  decorators: [Reset],
} as Meta

const Template: Story<any> = (args: Color) => {
  const values = useControls({ color: args })

  const _color = React.useMemo(() => {
    if (typeof values.color !== 'string') {
      let c = values.color as Color

      if ('a' in c) return `rgb(${c.r}, ${c.g}, ${c.b}, ${c.a})`
      return `rgb(${c.r}, ${c.g}, ${c.b})`
    }

    return values.color
  }, [values.color])

  return (
    <div style={{ width: '100vw', height: '100vh', padding: '2rem', backgroundColor: _color }}>
      <pre>{JSON.stringify(values, null, '  ')}</pre>
    </div>
  )
}

export const Hexadecimal = Template.bind({})
Hexadecimal.args = {
  value: '#ff005b',
}

export const Hex8 = Template.bind({})
Hex8.args = {
  value: '#ff005b88',
}

export const RGBObject = Template.bind({})
RGBObject.args = {
  value: { r: 248, g: 214, b: 40 },
}

export const RGBAObject = Template.bind({})
RGBAObject.args = {
  value: { r: 248, g: 214, b: 40, a: 1 },
}

export const String = Template.bind({})
String.args = {
  value: 'royalblue',
}

export const AllTheColors = () => {
  const values = useControls({
    Hex: '#f00',
    Hex8: '#ff0ff033',
    RgbString: 'rgb(0,0,0)',
    RgbaString: 'rgba(0,0,0,0.5)',
    Rgb: { r: 100, g: 100, b: 100 },
    Rgba: { r: 100, g: 100, b: 100, a: 0.5 },
    Hsl: { h: 0, s: 1, l: 0.5 },
    HslaString: 'hsla(0,0,0,0.5)',
  })

  return (
    <div style={{ width: '100vw', height: '100vh', padding: '2rem' }}>
      <pre>{JSON.stringify(values, null, '  ')}</pre>
    </div>
  )
}
