import React from 'react'
import { StoryFn, Meta } from '@storybook/react'
import { expect, within } from 'storybook/test'

import Reset from '../components/decorator-reset'

import { useControls } from '../../src'

export default {
  title: 'Inputs/Number',
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
  value: 1,
}
Simple.play = async ({ canvasElement }) => {
  const canvas = within(canvasElement)
  // Verify the story renders
  await expect(canvas.getByText(/1/)).toBeInTheDocument()
}

export const MinMax = Template.bind({})
MinMax.args = {
  value: 1,
  min: 0,
  max: 10,
}
MinMax.play = async ({ canvasElement }) => {
  const canvas = within(canvasElement)
  // Verify the story renders
  await expect(canvas.getByText(/1/)).toBeInTheDocument()
}

export const WithValueOverflow = Template.bind({})
WithValueOverflow.args = {
  value: 100,
  min: 0,
  max: 10,
}
WithValueOverflow.play = async ({ canvasElement }) => {
  const canvas = within(canvasElement)
  // Verify the story renders
  await expect(canvas.getByText(/10/)).toBeInTheDocument()
}

export const Step = Template.bind({})
Step.args = {
  value: 10,
  step: 0.25,
}
Step.play = async ({ canvasElement }) => {
  const canvas = within(canvasElement)
  // Verify the story renders
  await expect(canvas.getByText(/10/)).toBeInTheDocument()
}

export const Suffix = Template.bind({})
Suffix.args = { value: '10px' }
Suffix.play = async ({ canvasElement }) => {
  const canvas = within(canvasElement)
  // Verify the story renders
  await expect(canvas.getByText(/10px/)).toBeInTheDocument()
}

export const Complete = Template.bind({})
Complete.args = {
  value: 5,
  min: 0,
  max: 10,
  step: 1,
  suffix: 'px',
}
Complete.play = async ({ canvasElement }) => {
  const canvas = within(canvasElement)
  // Verify the story renders
  await expect(canvas.getByText(/5/)).toBeInTheDocument()
}
