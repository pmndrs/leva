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

export const Simple = Template.bind({})
Simple.args = {
  value: 'x',
  options: ['x', 'y'],
}

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

export const DifferentOptionTypes = Template.bind({})
DifferentOptionTypes.args = {
  value: undefined,
  options: ['x', 'y', ['x', 'y']],
}

const IconA = () => <span>IconA</span>
const IconB = () => <span>IconB</span>

export const FunctionAsOptions = () => {
  const values = useControls({
    foo: { options: { none: '', IconA, IconB } },
  })

  return (
    <div>
      <pre>{values.foo.toString()}</pre>
    </div>
  )
}

export const ValueLabelObjects = Template.bind({})
ValueLabelObjects.args = {
  value: '#f00',
  options: [
    { value: '#f00', label: 'red' },
    { value: '#0f0', label: 'green' },
    { value: '#00f', label: 'blue' },
  ],
}

export const ValueLabelObjectsWithFunctions = () => {
  const fn1 = () => console.log('Function 1')
  const fn2 = () => console.log('Function 2')
  const fn3 = () => console.log('Function 3')

  const values = useControls({
    myFunction: {
      options: [
        { value: fn1, label: 'First Function' },
        { value: fn2, label: 'Second Function' },
        { value: fn3, label: 'Third Function' },
      ],
    },
  })

  return (
    <div>
      <pre>Selected: {values.myFunction.name || 'anonymous function'}</pre>
      <button onClick={values.myFunction}>Call selected function</button>
    </div>
  )
}
