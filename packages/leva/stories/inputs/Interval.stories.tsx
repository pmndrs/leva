import React from 'react'
import { StoryFn, Meta } from '@storybook/react'

import Reset from '../components/decorator-reset'

import { useControls } from '../../src'

export default {
  title: 'Inputs/Interval',
  decorators: [Reset],
} as Meta

const Template: StoryFn = (args) => {
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
  value: [10, 15],
  min: 1,
  max: 20,
}

export const OverflowingValue = Template.bind({})
OverflowingValue.args = {
  value: [-10, 150],
  min: 1,
  max: 20,
}
