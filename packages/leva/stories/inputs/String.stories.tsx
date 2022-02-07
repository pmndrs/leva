import React from 'react'
import { Story, Meta } from '@storybook/react'

import Reset from '../components/decorator-reset'

import { useControls } from '../../src'

export default {
  title: 'Inputs/String',
  decorators: [Reset],
} as Meta

const Template: Story<any> = (args) => {
  const values = useControls({
    foo: args,
  })

  return (
    <div>
      <pre>{JSON.stringify(values, null, '  ')}</pre>
    </div>
  )
}

export const Simple = Template.bind({})
Simple.args = {
  value: 'Leva is awesome',
}

export const DefaultRows = Template.bind({})
DefaultRows.args = {
  value: 'Leva also supports <textarea/>\nAllowing for\nmultiple lines',
  rows: true,
}

export const CustomRows = Template.bind({})
CustomRows.args = {
  value: 'You can specify the number of rows you need',
  rows: 3,
}

export const NonEditable = Template.bind({})
NonEditable.args = {
  value: 'This text is not editable but still supports\nline\nbreaks.',
  editable: false,
}
