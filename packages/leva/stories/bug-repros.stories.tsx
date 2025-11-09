import React, { useState } from 'react'
import Reset from './components/decorator-reset'
import { Meta } from '@storybook/react'
import { Leva, LevaPanel, useControls, useCreateStore } from '../src'

export default {
  title: 'Dev/BugRepro',
  decorators: [Reset],
} as Meta

// https://github.com/pmndrs/leva/issues/456
export const NeverHideWithDynamicDependencies = () => {
  const [n, setN] = useState(0)
  const inputs = Array(n)
    .fill(0)
    .reduce((acc, _, i) => Object.assign(acc, { [`input${i}`]: i }), {})

  useControls(inputs, [n])

  return (
    <div className="App">
      <Leva neverHide />
      <button onClick={() => setN((n) => n + 1)}>Add input</button>
    </div>
  )
}

NeverHideWithDynamicDependencies.storyName = '456 / neverHide prop with dynamic controls'

// repro for https://github.com/pmndrs/leva/issues/538
export const DynamicDependencies = () => {
  const [layers, setLayers] = useState(1)

  const controls = {
    layers: {
      value: layers,
      step: 1,
      min: 0,
      max: 5,
      onChange: (v) => setLayers(v),
    },
  }

  Array.from({ length: layers }, (_, i) => {
    controls[`layer${i + 1}`] = {
      value: 0,
      step: 10,
    }
  })

  const result = useControls(controls, [layers])

  return (
    <div className="App">
      <pre>{JSON.stringify(result, null, '  ')}</pre>
    </div>
  )
}

DynamicDependencies.storyName = '538 / dynamic dependencies should update height'

// repro for https://github.com/pmndrs/leva/issues/540
const MyComponent = ({ store }) => {
  const controls = useControls(
    {
      color: '#00aa88',
      moreSettings: false,
      roughness: {
        value: 0.5,
        min: 0,
        max: 1,
        step: 0.01,
        render: (get) => get('moreSettings'),
      },
      metalness: {
        value: 0.5,
        min: 0,
        max: 1,
        step: 0.01,
        render: (get) => get('moreSettings'),
      },
    },
    { store }
  )

  return (
    <div>
      <pre>{JSON.stringify(controls, null, '  ')}</pre>
    </div>
  )
}

export const ConditionalControls = () => {
  const store = useCreateStore()

  return (
    <div className="App">
      <MyComponent store={store} />
      <LevaPanel store={store} />
    </div>
  )
}

ConditionalControls.storyName = '540 / conditional controls should work'
