import React from 'react'
import { StoryFn, Meta } from '@storybook/react'
import { expect, within, waitFor } from 'storybook/test'

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

  await waitFor(() => {
    expect(within(document.body).getByLabelText(/foo/i)).toBeInTheDocument()
  })

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

  await waitFor(() => {
    expect(within(document.body).getByLabelText(/foo/i)).toBeInTheDocument()
  })

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

  await waitFor(() => {
    expect(within(document.body).getByLabelText(/foo/i)).toBeInTheDocument()
  })

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

  await waitFor(() => {
    expect(within(document.body).getByLabelText(/foo/i)).toBeInTheDocument()
  })

  // Verify the story renders
  await expect(canvas.getByText(/10/)).toBeInTheDocument()
}

// Multiple controls to test step visualization in context
const StepComplexTemplate: StoryFn = () => {
  const values = useControls({
    noStep: { value: 20, min: 0, max: 100 },
    wideSteps: { value: 4, min: 0, max: 20, step: 2 },
    mediumSteps: { value: 2.5, min: 0, max: 8, step: 0.5 },
    fineSteps: { value: 1.25, min: 0, max: 5, step: 0.25 },
    denseSteps: { value: 50, min: 0, max: 100, step: 1 },
    veryDenseSteps: { value: 0.5, min: 0, max: 1, step: 0.01 },
  })

  return (
    <div>
      <pre>{JSON.stringify(values, null, '  ')}</pre>
    </div>
  )
}

export const StepComplex = StepComplexTemplate.bind({})
StepComplex.storyName = 'Step Sliders'
StepComplex.play = async ({ canvasElement }) => {
  const canvas = within(canvasElement)

  await waitFor(() => {
    expect(within(document.body).getByLabelText(/wideSteps/i)).toBeInTheDocument()
  })

  // Verify multiple controls render
  await expect(canvas.getByText(/"wideSteps"/)).toBeInTheDocument()
  await expect(canvas.getByText(/"mediumSteps"/)).toBeInTheDocument()
  await expect(canvas.getByText(/"fineSteps"/)).toBeInTheDocument()
  await expect(canvas.getByText(/"denseSteps"/)).toBeInTheDocument()
  await expect(canvas.getByText(/"veryDenseSteps"/)).toBeInTheDocument()
}

export const Suffix = Template.bind({})
Suffix.args = { value: '10px' }
Suffix.play = async ({ canvasElement }) => {
  const canvas = within(canvasElement)

  await waitFor(() => {
    expect(within(document.body).getByLabelText(/foo/i)).toBeInTheDocument()
  })

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

  await waitFor(() => {
    expect(within(document.body).getByLabelText(/foo/i)).toBeInTheDocument()
  })

  // Verify the story renders
  await expect(canvas.getByText(/5/)).toBeInTheDocument()
}
