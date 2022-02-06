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

export const Textarea = Template.bind({})
Textarea.args = {
  value: 'Leva also supports <textarea/>\nAllowing for\nmultiple\nlines',
  textarea: true,
}

export const NonEditable = Template.bind({})
NonEditable.args = {
  value: 'This text is not editable but still supports\nline\nbreaks.',
  editable: false,
}
