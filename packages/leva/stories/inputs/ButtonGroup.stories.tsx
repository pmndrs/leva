import React from 'react'
import { Story, Meta } from '@storybook/react'

import Reset from '../components/decorator-reset'

import { useControls, buttonGroup } from '../../src'

export default {
  title: 'Inputs/ButtonGroup',
  decorators: [Reset],
} as Meta

const Template: Story<any> = (args) => {
  const values = useControls({
    bars: buttonGroup({
      hi: () => alert('click hi'),
      ho: () => alert('click ho'),
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
