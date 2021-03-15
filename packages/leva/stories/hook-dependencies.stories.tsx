import React from 'react'
import Reset from './components/decorator-reset'
import { Story, Meta } from '@storybook/react'

import { useControls } from '../src'

export default {
  title: 'Hook/Dependency',
  decorators: [Reset],
} as Meta

export const Inputs: Story<any> = () => {
  const [n, setN] = React.useState(1)
  const inputs = Array(n)
    .fill(0)
    .reduce((acc, _, i) => Object.assign(acc, { [`input${i}`]: i }), {})

  const values = useControls(inputs, [n])

  return (
    <div>
      <button onClick={() => setN((n) => n + 1)}>Add input</button>
      <pre>{JSON.stringify(values, null, '  ')}</pre>
    </div>
  )
}

export const Update: Story<any> = () => {
  const [toggle, setToggle] = React.useState(true)
  const options = toggle ? ['foo', 'bar'] : ['x', 'y', 'z']

  const values = useControls(
    {
      select: { value: options[0], options: options },
      color: { value: '#f00', hint: 'Used for important content' },
    },
    [options]
  )

  return (
    <div>
      <button onClick={() => setToggle(!toggle)}>Update options</button>
      <pre>{JSON.stringify(values, null, '  ')}</pre>
      <pre>{JSON.stringify(options, null, '  ')}</pre>
    </div>
  )
}

function A() {
  const options = ['x', 'y', 'z']
  useControls({ color: { value: 'blue' }, select: { value: 'x', options: options } })

  return null
}

function B() {
  const options = ['foo', 'bar']
  useControls({ color: { value: '#f00', label: 'bg' }, select: { value: 'foo', options: options } })

  return null
}

export const Siblings: Story<any> = () => {
  const [showB, setShowB] = React.useState(false)
  return (
    <>
      <A />
      {showB && <B />}
      <button onClick={() => setShowB(!showB)}>Switch component</button>
      <pre>Showing component {showB ? 'B' : 'A'}</pre>
    </>
  )
}
