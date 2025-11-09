import React from 'react'
import type { Meta, StoryObj } from '@storybook/react'
import { expect, within, userEvent, waitFor } from 'storybook/test'

import Reset from '../components/decorator-reset'

import { useControls } from '../../src'

const meta: Meta = {
  title: 'Inputs/Select',
  decorators: [Reset],
}

export default meta
type Story = StoryObj<typeof meta>

/**
 * Passes a list of values. The value will be used as both value AND label.
 */
export const Simple: Story = {
  render: function Simple() {
    const values = useControls({
      foo: {
        value: 'x',
        options: ['x', 'y'],
      },
    })

    return (
      <div>
        <pre>{JSON.stringify(values, null, '  ')}</pre>
      </div>
    )
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement)

    // Wait for initial render
    await waitFor(() => {
      expect(within(document.body).getByText('foo')).toBeInTheDocument()
    })

    // Verify initial value is 'x'
    await expect(canvas.getByText(/"foo":\s*"x"/)).toBeInTheDocument()

    // Find the native select element by label (rendered in document.body)
    const selectElement = within(document.body).getByLabelText('foo') as HTMLSelectElement

    // Change to 'y'
    await userEvent.selectOptions(selectElement, 'y')

    // Verify value changed to 'y'
    await waitFor(() => {
      expect(canvas.getByText(/"foo":\s*"y"/)).toBeInTheDocument()
    })

    // Change back to 'x'
    await userEvent.selectOptions(selectElement, 'x')

    // Verify value is back to 'x'
    await waitFor(() => {
      expect(canvas.getByText(/"foo":\s*"x"/)).toBeInTheDocument()
    })
  },
}

/**
 * No value is passed, so the first option will be selected as the default.
 */
export const NoValue: Story = {
  render: function NoValue() {
    const values = useControls({
      foo: {
        options: ['x', 'y'],
      },
    })

    return (
      <div>
        <pre>{JSON.stringify(values, null, '  ')}</pre>
      </div>
    )
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement)

    // Wait for initial render - default should be first option 'x'
    await waitFor(() => {
      expect(within(document.body).getByText('foo')).toBeInTheDocument()
    })

    // Verify default value is 'x'
    await expect(canvas.getByText(/"foo":\s*"x"/)).toBeInTheDocument()

    // Find the native select element by label
    const selectElement = within(document.body).getByLabelText('foo') as HTMLSelectElement

    // Change to 'y'
    await userEvent.selectOptions(selectElement, 'y')

    // Verify value changed to 'y'
    await waitFor(() => {
      expect(canvas.getByText(/"foo":\s*"y"/)).toBeInTheDocument()
    })

    // Change back to 'x'
    await userEvent.selectOptions(selectElement, 'x')

    // Verify value is back to 'x'
    await waitFor(() => {
      expect(canvas.getByText(/"foo":\s*"x"/)).toBeInTheDocument()
    })
  },
}

/**
 * Passes an object of values. The key will be used as label and the value will be used as value.
 */
export const CustomLabels: Story = {
  render: function CustomLabels() {
    const values = useControls({
      foo: {
        value: 'helloWorld',
        options: {
          'Hello World': 'helloWorld',
          'Leva is awesome!': 'leva',
        },
      },
    })

    return (
      <div>
        <pre>{JSON.stringify(values, null, '  ')}</pre>
      </div>
    )
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement)

    // Wait for initial render
    await waitFor(() => {
      expect(within(document.body).getByText('foo')).toBeInTheDocument()
    })

    // Verify initial value is 'helloWorld'
    await expect(canvas.getByText(/"foo":\s*"helloWorld"/)).toBeInTheDocument()

    // Find the native select element by label
    const selectElement = within(document.body).getByLabelText('foo') as HTMLSelectElement

    // Change to 'leva' (labeled as 'Leva is awesome!')
    await userEvent.selectOptions(selectElement, 'Leva is awesome!')

    // Verify value changed to 'leva'
    await waitFor(() => {
      expect(canvas.getByText(/"foo":\s*"leva"/)).toBeInTheDocument()
    })

    // Change back to 'helloWorld' (labeled as 'Hello World')
    await userEvent.selectOptions(selectElement, 'Hello World')

    // Verify value is back to 'helloWorld'
    await waitFor(() => {
      expect(canvas.getByText(/"foo":\s*"helloWorld"/)).toBeInTheDocument()
    })
  },
}

const ComponentA = () => <span>Component A</span>
const ComponentB = () => <span>Component B</span>

/**
 * Shows passing functions as the option values.
 */
export const FunctionAsOptions: Story = {
  render: function FunctionAsOptions() {
    const values = useControls({
      foo: {
        options: { none: '', ComponentA, ComponentB },
      },
    })

    if (!values.foo) {
      return <div>No component selected</div>
    }

    // render value.foo as a react component
    const Component = values.foo as React.ComponentType

    return (
      <div>
        <Component />
      </div>
    )
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement)

    // Wait for initial render
    await waitFor(() => {
      expect(within(document.body).getByText('foo')).toBeInTheDocument()
    })

    // Verify initial state (default is first option 'none', so no component)
    await expect(canvas.getByText('No component selected')).toBeInTheDocument()

    // Find the native select element by label
    const selectElement = within(document.body).getByLabelText('foo') as HTMLSelectElement

    // Change to 'ComponentA'
    await userEvent.selectOptions(selectElement, 'ComponentA')

    // Verify ComponentA is rendered
    await waitFor(() => {
      expect(canvas.getByText('Component A')).toBeInTheDocument()
    })

    // Change back to 'none'
    await userEvent.selectOptions(selectElement, 'none')

    // Verify back to no component
    await waitFor(() => {
      expect(canvas.getByText('No component selected')).toBeInTheDocument()
    })
  },
}

/**
 * Shows passing a value/label records array.
 */
export const ValueLabelObjects: Story = {
  render: function ValueLabelObjects() {
    const values = useControls({
      foo: {
        value: '#f00',
        options: [
          { value: '#f00', label: 'red' },
          { value: '#0f0', label: 'green' },
          { value: '#00f', label: 'blue' },
        ],
      },
    })

    return (
      <div>
        <pre>{JSON.stringify(values, null, '  ')}</pre>
      </div>
    )
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement)

    // Wait for initial render
    await waitFor(() => {
      expect(within(document.body).getByText('foo')).toBeInTheDocument()
    })

    // Verify initial value is '#f00'
    await expect(canvas.getByText(/"foo":\s*"#f00"/)).toBeInTheDocument()

    // Find the native select element by label
    const selectElement = within(document.body).getByLabelText('foo') as HTMLSelectElement

    // Change to 'green' (value '#0f0')
    await userEvent.selectOptions(selectElement, 'green')

    // Verify value changed to '#0f0'
    await waitFor(() => {
      expect(canvas.getByText(/"foo":\s*"#0f0"/)).toBeInTheDocument()
    })

    // Change back to 'red' (value '#f00')
    await userEvent.selectOptions(selectElement, 'red')

    // Verify value is back to '#f00'
    await waitFor(() => {
      expect(canvas.getByText(/"foo":\s*"#f00"/)).toBeInTheDocument()
    })
  },
}
