import React from 'react'
import { StoryFn, Meta } from '@storybook/react'
import { expect, within } from 'storybook/test'

import Reset from '../components/decorator-reset'

import { useControls } from '../../src'

export default {
  title: 'Inputs/Boolean',
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

export const Default = Template.bind({})
Default.args = {
  value: false,
}
Default.play = async ({ canvasElement }) => {
  const canvas = within(canvasElement)
  // Verify the story renders without errors
  await expect(canvas.getByText(/false/)).toBeInTheDocument()
}

export const Checked = Template.bind({})
Checked.args = {
  value: true,
}
Checked.play = async ({ canvasElement }) => {
  const canvas = within(canvasElement)
  // Verify the story renders without errors
  await expect(canvas.getByText(/true/)).toBeInTheDocument()
}
