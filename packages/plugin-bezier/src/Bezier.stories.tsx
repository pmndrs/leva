import React from 'react'
import { Story, Meta } from '@storybook/react'

import Reset from 'leva/stories/components/decorator-reset'
import { useControls } from 'leva/src'

import { bezier } from './index'
import './Bezier.stories.css'

export default {
  title: 'Plugins/Bezier',
  decorators: [Reset],
} as Meta

const Template: Story<any> = (args) => {
  const data = useControls({ curve: args })
  return (
    <div>
      <div className="bezier-animated" style={{ animationTimingFunction: data.curve.cssEasing }} />
      <pre>{JSON.stringify(data, null, '  ')}</pre>
    </div>
  )
}

export const DefaultBezier = Template.bind({})
DefaultBezier.args = bezier(undefined)

export const WithArguments = Template.bind({})
WithArguments.args = bezier([0.54, 0.05, 0.6, 0.98])

export const WithPreset = Template.bind({})
WithPreset.args = bezier('in-out-quadratic')

export const WithOptions = Template.bind({})
WithOptions.args = bezier({ handles: [0.54, 0.05, 0.6, 0.98], graph: false })
