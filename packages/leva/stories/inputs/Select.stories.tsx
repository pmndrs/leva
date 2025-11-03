import React from 'react'
import { StoryFn, Meta } from '@storybook/react'

import Reset from '../components/decorator-reset'

import { useControls } from '../../src'

export default {
  title: 'Inputs/Select',
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

/**
 * Passes a list of values. The value will be used as both value AND label.
 */
export const Simple = Template.bind({})
Simple.args = {
  value: 'x',
  options: ['x', 'y'],
}

/**
 * No value is passed, so the first option will be selected as the default.
 */
export const NoValue = Template.bind({})
NoValue.args = {
  options: ['x', 'y'],
}

/**
 * Passes an object of values. The key will be used as label and the value will be used as value.
 */
export const CustomLabels = Template.bind({})
CustomLabels.args = {
  value: 'helloWorld',
  options: {
    'Hello World': 'helloWorld',
    'Leva is awesome!': 'leva',
  },
}

export const InferredValueAsOption = Template.bind({})
InferredValueAsOption.args = {
  value: true,
  options: [false],
}

/**
 * Unsupported/deprecated use case, instead use consistent format for options
 */
export const DifferentOptionTypes = Template.bind({})
DifferentOptionTypes.args = {
  value: undefined,
  options: ['x', 'y', ['x', 'y']],
}

const ComponentA = () => <span>Component A</span>
const ComponentB = () => <span>Component B</span>

/**
 * Shows passing functions as the option values.
 */
export const FunctionAsOptions = () => {
  const values = useControls({
    foo: { options: { none: '', ComponentA, ComponentB } },
  })

  if (!values.foo) return null

  // render value.foo as a react component
  const Component = values.foo as React.ComponentType

  return (
    <div>
      <Component />
    </div>
  )
}

/**
 * Shows passing a value/label records array.
 */
export const ValueLabelObjects = Template.bind({})
ValueLabelObjects.args = {
  value: '#f00',
  options: [
    { value: '#f00', label: 'red' },
    { value: '#0f0', label: 'green' },
    { value: '#00f', label: 'blue' },
  ],
}
