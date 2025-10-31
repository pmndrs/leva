import React from 'react'
import { StoryFn, Meta } from '@storybook/react'
import { expect, within, userEvent } from 'storybook/test'

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
      <pre data-testid="output">{JSON.stringify(values, null, '  ')}</pre>
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

export const SuffixValueTest = Template.bind({})
SuffixValueTest.args = {
  value: 10,
  min: 10,
  suffix: 'ms',
}
SuffixValueTest.play = async ({ canvasElement }) => {
  const canvas = within(canvasElement)

  // Verify initial value is a number, not a string with suffix
  const output = canvas.getByTestId('output')
  await expect(output.textContent).toContain('"foo": 10')

  // Find the input field (Leva panel is rendered in document.body)
  const input = within(document.body).getByLabelText(/foo/i) as HTMLInputElement

  // Verify the input displays the suffix
  await expect(input.value).toBe('10ms')

  // Change the value
  await userEvent.clear(input)
  await userEvent.type(input, '15')

  // Blur to trigger update
  await userEvent.tab()

  // Wait a bit for the state to update
  await new Promise((resolve) => setTimeout(resolve, 100))

  // Verify the returned value is numeric without suffix
  await expect(output.textContent).toContain('"foo": 15')

  // Verify it doesn't contain the suffix in the value
  await expect(output.textContent).not.toContain('"foo": "15ms"')
}
