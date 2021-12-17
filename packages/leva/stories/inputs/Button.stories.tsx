import React from 'react'
import { Meta } from '@storybook/react'

import Reset from '../components/decorator-reset'

import { useControls, button } from '../../src'

export default {
  title: 'Inputs/Button',
  decorators: [Reset],
} as Meta

export const Button = () => {
  const values = useControls({
    number: 3,
    foo: button((get) => alert(`Number value is ${get('number').toFixed(2)}`)),
  })

  return (
    <div>
      <pre>{JSON.stringify(values, null, '  ')}</pre>
    </div>
  )
}

export const DisabledButton = () => {
  const values = useControls({
    number: 3,
    foo: button((get) => alert(`Number value is ${get('number')}`), { disabled: true }),
  })

  return (
    <div>
      <pre>{JSON.stringify(values, null, '  ')}</pre>
    </div>
  )
}
