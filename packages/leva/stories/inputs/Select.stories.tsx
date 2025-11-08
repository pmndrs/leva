import React from 'react'
import type { Meta, StoryObj } from '@storybook/react'

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
}

export const InferredValueAsOption: Story = {
  render: function InferredValueAsOption() {
    const values = useControls({
      foo: {
        value: true,
        options: [false],
      },
    })

    return (
      <div>
        <pre>{JSON.stringify(values, null, '  ')}</pre>
      </div>
    )
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
}
