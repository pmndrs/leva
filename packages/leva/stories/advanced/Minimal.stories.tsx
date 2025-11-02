import React from 'react'
import Reset from '../components/decorator-reset'
import { Meta } from '@storybook/react'
import { useControls, Leva } from '../../src'

export default {
  title: 'Advanced/Minimal',
  decorators: [Reset],
} as Meta

export const Default = () => {
  const data = useControls({
    number: 10,
    minmax: { value: 12.5, min: 5.5, max: 30.5, optional: true },
    printSize: { value: 100, min: 80, max: 140, step: 10 },
    color: {
      value: '#f00',
      hint: 'Hey, we support icons and hinting values and long text will wrap!',
    },
  })

  return (
    <>
      <Leva titleBar={false} />
      <pre>{JSON.stringify(data, null, '  ')}</pre>
    </>
  )
}
