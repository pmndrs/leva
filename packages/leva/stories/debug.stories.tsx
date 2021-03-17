import React from 'react'
import Reset from './components/decorator-reset'
import { Story, Meta } from '@storybook/react'

import { useControls } from '../src'

export default {
  title: 'Hook/Debug',
  decorators: [Reset],
} as Meta

function AMountsAChangeDeps_A() {
  const [toggle, setToggle] = React.useState(true)
  const options = toggle ? ['foo', 'bar'] : ['x', 'y', 'z']

  const values = useControls({ color: { value: 'blue' }, select: { value: 'foo', options: options } }, [options])

  return (
    <div>
      <h1>A</h1>
      <button onClick={() => setToggle(!toggle)}>Update options</button>
      <pre>{JSON.stringify(values, null, '  ')}</pre>
      <pre>{JSON.stringify(options, null, '  ')}</pre>
    </div>
  )
}

export const AMountsAChangeDeps: Story<any> = () => {
  return (
    <div>
      <h4>1. A mounts. A change deps → inputs change</h4>
      <AMountsAChangeDeps_A />
    </div>
  )
}

function AMountsBMountsDoesntChange_A() {
  const [toggle, setToggle] = React.useState(true)
  const options = toggle ? ['foo', 'bar'] : ['x', 'y', 'z']

  const values = useControls({ color: { value: 'blue' }, select: { value: options[0], options: options } })

  return (
    <div>
      <h5>A</h5>
      <pre>{JSON.stringify(values, null, '  ')}</pre>
      <pre>{JSON.stringify(options, null, '  ')}</pre>
    </div>
  )
}

function AMountsBMountsDoesntChange_B() {
  const options = ['x', 'y', 'z']

  const values = useControls({ color: { value: 'red' }, select: { label: 'bg', value: options[0], options: options } })

  return (
    <div>
      <h5>B</h5>
      <pre>{JSON.stringify(values, null, '  ')}</pre>
      <pre>{JSON.stringify(options, null, '  ')}</pre>
    </div>
  )
}

export const AMountsBMountsDoesntChange: Story<any> = () => {
  const [showB, setShowB] = React.useState(false)

  return (
    <div>
      <h4>2. A mounts. B mounts → inputs don't change</h4>
      <button onClick={() => setShowB(!showB)}>Toggle B</button>
      <AMountsBMountsDoesntChange_A />
      {showB && <AMountsBMountsDoesntChange_B />}
    </div>
  )
}

function AMountsBMountsDepsChange_A() {
  const [toggle, setToggle] = React.useState(true)
  const options = toggle ? ['foo', 'bar'] : ['a', 'b', 'c']

  const values = useControls({ color: { value: 'blue' }, select: { value: options[0], options: options } }, [options])

  return (
    <div>
      <h5>A</h5>
      <button onClick={() => setToggle(!toggle)}>Update A options</button>
      <pre>{JSON.stringify(values, null, '  ')}</pre>
      <pre>{JSON.stringify(options, null, '  ')}</pre>
    </div>
  )
}

function AMountsBMountsDepsChange_B() {
  const [toggle, setToggle] = React.useState(true)
  const options = toggle ? ['x', 'y', 'z'] : ['9', '8', '7']

  const values = useControls(
    { color: { value: 'red' }, select: { label: 'bg', value: options[0], options: options } },
    [options]
  )

  return (
    <div>
      <h5>B</h5>
      <button onClick={() => setToggle(!toggle)}>Update B options</button>
      <pre>{JSON.stringify(values, null, '  ')}</pre>
      <pre>{JSON.stringify(options, null, '  ')}</pre>
    </div>
  )
}

export const AMountsBMountsDepsChange: Story<any> = () => {
  const [showB, setShowB] = React.useState(false)

  return (
    <div>
      <h4>3. A mounts. B mounts. A deps change → inputs change</h4>
      <button onClick={() => setShowB(!showB)}>Toggle B</button>
      <AMountsBMountsDepsChange_A />
      {showB && <AMountsBMountsDepsChange_B />}
    </div>
  )
}
