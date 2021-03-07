import React from 'react'
import Reset from './components/decorator-reset'
import { Meta } from '@storybook/react'

import { folder, useControls } from '../src'

export default {
  title: 'Misc/Input options',
  decorators: [Reset],
} as Meta

export const Label = () => {
  const values = useControls({
    number: { value: 3, label: 'My number' },
  })

  return (
    <div>
      <pre>{JSON.stringify(values, null, '  ')}</pre>
    </div>
  )
}

export const Hint = () => {
  const values = useControls({
    color: { value: '#f00', hint: 'Used for important content' },
    position: { value: [0, 0, 0], hint: 'Position of the object relative to the screen' },
  })

  return (
    <div>
      <pre>{JSON.stringify(values, null, '  ')}</pre>
    </div>
  )
}

export const Render = () => {
  const values = useControls({
    show: { value: true, label: 'Show color' },
    color: { value: '#fff', render: (get) => get('show') },
    show2: { value: false, label: 'Show folder' },
    folder: folder(
      {
        number: 1,
        string: {
          value: 'shown if `number >= 1`',
          render: (get) => get('folder.number') >= 1,
        },
      },
      { render: (get) => get('show2') }
    ),
  })

  return (
    <div>
      <pre>{JSON.stringify(values, null, '  ')}</pre>
    </div>
  )
}

export const Optional = () => {
  const values = useControls({
    color: { value: '#f00', optional: true },
    vector: { value: [0, 0, 0], optional: true, disabled: true },
  })
  return (
    <div>
      <pre>{JSON.stringify(values, null, '  ')}</pre>
    </div>
  )
}
