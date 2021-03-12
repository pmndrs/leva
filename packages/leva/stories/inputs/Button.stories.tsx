import React from 'react'
import { Story, Meta } from '@storybook/react'

import Reset from '../components/decorator-reset'

import { useControls, button, buttonGroup } from '../../src'

export default {
  title: 'Inputs/Button',
  decorators: [Reset],
} as Meta

const Template: Story<any> = (args) => {
  const values = useControls({
    foo: button(() => alert('click')),
    bars: buttonGroup({
      hi: () => alert('hi'),
      ho: () => alert('ho'),
    }),
  })

  return (
    <div>
      <pre>{JSON.stringify(values, null, '  ')}</pre>
    </div>
  )
}

export const Default = Template.bind({})
Default.args = {}
