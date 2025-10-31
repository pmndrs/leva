import React from 'react'
import { StoryFn, Meta } from '@storybook/react'
import { expect, within, userEvent } from 'storybook/test'

import Reset from '../components/decorator-reset'

import { useControls } from '../../src'

export default {
  title: 'Inputs/String',
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
  value: 'Leva is awesome',
}
Simple.play = async ({ canvasElement }) => {
  const canvas = within(canvasElement)

  // Verify initial value is rendered in the JSON output
  await expect(canvas.getByText(/Leva is awesome/)).toBeInTheDocument()

  // Leva panel is rendered outside canvasElement (in document.body)
  // Find the input field by label (the control label is "foo")
  const input = within(document.body).getByLabelText(/foo/i)

  // Clear the input and type new text
  await userEvent.clear(input)
  await userEvent.type(input, 'New text value')

  // Blur the input to trigger the update (Leva updates on blur)
  await userEvent.tab()

  // Wait for the value to update in the JSON output
  await expect(canvas.getByText(/New text value/)).toBeInTheDocument()

  // Verify the old value is gone
  await expect(canvas.queryByText(/Leva is awesome/)).not.toBeInTheDocument()
}

export const DefaultRows = Template.bind({})
DefaultRows.args = {
  value: 'Leva also supports <textarea/>\nAllowing for\nmultiple lines',
  rows: true,
}
DefaultRows.play = async ({ canvasElement }) => {
  const canvas = within(canvasElement)
  // Verify the story renders with multi-line text
  await expect(canvas.getByText(/Leva also supports/)).toBeInTheDocument()

  // Find the textarea field (Leva panel is in document.body)
  const textarea = within(document.body).getByLabelText(/foo/i)

  // Change the text
  await userEvent.clear(textarea)
  await userEvent.type(textarea, 'Updated textarea content')

  // Blur to trigger update
  await userEvent.tab()

  // Verify the updated value appears in the output
  await expect(canvas.getByText(/Updated textarea content/)).toBeInTheDocument()
}

export const CustomRows = Template.bind({})
CustomRows.args = {
  value: 'You can specify the number of rows you need',
  rows: 3,
}
CustomRows.play = async ({ canvasElement }) => {
  const canvas = within(canvasElement)
  // Verify the story renders
  await expect(canvas.getByText(/You can specify/)).toBeInTheDocument()

  // Find the textarea and update it
  const textarea = within(document.body).getByLabelText(/foo/i)
  await userEvent.clear(textarea)
  await userEvent.type(textarea, 'Changed content')

  // Blur to trigger update
  await userEvent.tab()

  // Verify update
  await expect(canvas.getByText(/Changed content/)).toBeInTheDocument()
}

export const NonEditable = Template.bind({})
NonEditable.args = {
  value: 'This text is not editable but still supports\nline\nbreaks.',
  editable: false,
}
NonEditable.play = async ({ canvasElement }) => {
  const canvas = within(canvasElement)
  // Verify the story renders with non-editable text
  await expect(canvas.getByText(/This text is not editable/)).toBeInTheDocument()
}
