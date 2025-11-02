import React from 'react'
import Reset from '../components/decorator-reset'
import { Meta } from '@storybook/react'
import { useControls } from '../../src'

export default {
  title: 'Advanced/Transient',
  decorators: [Reset],
} as Meta

export const Default = () => {
  const [color, setColor] = React.useState('indianred')
  useControls({
    color: {
      value: 'indianred',
      onChange: (v) => setColor(v),
    },
  })

  return (
    <div
      style={{
        background: 'dimgray',
        height: '400px',
        width: '100%',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
      }}>
      <div
        style={{
          width: 200,
          height: 200,
          background: color,
          borderRadius: 8,
          boxShadow: '0 4px 6px rgba(0,0,0,0.3)',
        }}
      />
    </div>
  )
}
