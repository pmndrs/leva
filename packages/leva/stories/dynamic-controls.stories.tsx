import React, { useState } from 'react'
import Reset from './components/decorator-reset'
import { Meta } from '@storybook/react'
import { Leva, useControls } from '../src'

export default {
  title: 'Dev/Dynamic Controls',
  decorators: [Reset],
} as Meta

export const Default = () => {
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
