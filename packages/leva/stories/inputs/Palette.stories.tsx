import React from 'react'
import { Story, Meta } from '@storybook/react'
// @ts-ignore
import colors from 'nice-color-palettes'

import Reset from '../components/decorator-reset'

import { useControls } from '../../src'

export default {
  title: 'Inputs/Palette',
  decorators: [Reset],
} as Meta

const Template: Story<any> = (args) => {
  const values = useControls({
    foo: args,
  })

  return (
    <div>
      <pre>{JSON.stringify(values, null, '  ')}</pre>
    </div>
  )
}

export const Simple = Template.bind({})
Simple.args = {
  value: colors[0],
  options: colors.slice(0, 5),
}
