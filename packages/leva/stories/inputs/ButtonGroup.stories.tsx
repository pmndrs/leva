import React from 'react'
import { Meta } from '@storybook/react'

import Reset from '../components/decorator-reset'

import { useControls, buttonGroup } from '../../src'

export default {
  title: 'Inputs/Button Group',
  decorators: [Reset],
} as Meta

export const ButtonGroup = () => {
  const [values, set] = useControls(() => ({
    Size: 1,
    ' ': buttonGroup({
      '0.25x': () => set({ Size: 0.25 }),
      '0.5x': () => set({ Size: 0.5 }),
      '1x': () => set({ Size: 1 }),
      '2x': () => set({ Size: 2 }),
      '3x': () => set({ Size: 3 }),
    }),
  }))

  return (
    <div>
      <pre>{JSON.stringify(values, null, '  ')}</pre>
    </div>
  )
}
