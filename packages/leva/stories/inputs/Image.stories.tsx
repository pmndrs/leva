import React from 'react'
import { StoryFn, Meta } from '@storybook/react'

import Reset from '../components/decorator-reset'

import { useControls } from '../../src'
import type { ImageInput } from '../../src/types'

export default {
  title: 'Inputs/Image',
  decorators: [Reset],
} as Meta

const Template: StoryFn<ImageInput> = (args) => {
  const values = useControls({ foo: args })

  return <div>{values.foo && <img src={values.foo} alt="" width="200" />}</div>
}

export const Image = Template.bind({})
Image.args = { image: undefined }
