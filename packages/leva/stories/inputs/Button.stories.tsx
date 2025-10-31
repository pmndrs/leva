import React from 'react'
import { Meta } from '@storybook/react'
import { expect, within } from 'storybook/test'

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
Button.play = async ({ canvasElement }) => {
  const canvas = within(canvasElement)
  // Verify the story renders
  await expect(canvas.getByText(/number/)).toBeInTheDocument()
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
DisabledButton.play = async ({ canvasElement }) => {
  const canvas = within(canvasElement)
  // Verify the story renders
  await expect(canvas.getByText(/number/)).toBeInTheDocument()
}
