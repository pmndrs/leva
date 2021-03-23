import React from 'react'
import { Story, Meta } from '@storybook/react'

import Reset from 'leva/stories/components/decorator-reset'
import { useControls } from 'leva/src'

import { bezier } from './index'

export default {
  title: 'Plugins/Bezier',
  decorators: [Reset],
} as Meta

const Template: Story<any> = (args) => {
  const data = useControls({ b: args })
  return (
    <div>
      <pre>{JSON.stringify(data, null, '  ')}</pre>
    </div>
  )
}

export const DefaultBezier = Template.bind({})
DefaultBezier.args = bezier(undefined)

export const WithArguments = Template.bind({})
WithArguments.args = bezier([0.54, 0.05, 0.6, 0.98])
