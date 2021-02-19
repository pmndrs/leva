import React from 'react'
import Reset from './components/decorator-reset'
import { Story, Meta } from '@storybook/react'

import { folder, useControls } from '../src'

export default {
  title: 'Misc/Input options',
  decorators: [Reset],
} as Meta

const Template: Story<any> = () => {
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

export const Render = Template.bind({})
