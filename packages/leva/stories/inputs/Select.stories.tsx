import React from 'react'
import type { Meta, StoryObj } from '@storybook/react'

import Reset from '../components/decorator-reset'

import { useControls } from '../../src'

const meta = {
  title: 'Inputs/Select',
  decorators: [Reset],
} satisfies Meta

export default meta
type Story = StoryObj<typeof meta>

const Render = (args: any) => {
  const values = useControls({
    foo: args,
  })

  return (
    <div>
      <pre>{JSON.stringify(values, null, '  ')}</pre>
    </div>
  )
}

/**
 * Passes a list of values. The value will be used as both value AND label.
 */
export const Simple: Story = {
  args: {
    value: 'x',
    options: ['x', 'y'],
  },
  render: Render,
} as Story

/**
 * No value is passed, so the first option will be selected as the default.
 */
export const NoValue: Story = {
  args: {
    options: ['x', 'y'],
  },
  render: Render,
} as Story

/**
 * Passes an object of values. The key will be used as label and the value will be used as value.
 */
export const CustomLabels: Story = {
  args: {
    value: 'helloWorld',
    options: {
      'Hello World': 'helloWorld',
      'Leva is awesome!': 'leva',
    },
  },
  render: Render,
} as Story

export const InferredValueAsOption: Story = {
  args: {
    value: true,
    options: [false],
  },
  render: Render,
} as Story

const ComponentA = () => <span>Component A</span>
const ComponentB = () => <span>Component B</span>

/**
 * Shows passing functions as the option values.
 */
const FunctionAsOptionsRender = () => {
  const values = useControls({
    foo: { options: { none: '', ComponentA, ComponentB } },
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
}

export const FunctionAsOptions: Story = {
  render: FunctionAsOptionsRender,
} as Story

/**
 * Shows passing a value/label records array.
 */
export const ValueLabelObjects: Story = {
  args: {
    value: '#f00',
    options: [
      { value: '#f00', label: 'red' },
      { value: '#0f0', label: 'green' },
      { value: '#00f', label: 'blue' },
    ],
  },
  render: Render,
} as Story
