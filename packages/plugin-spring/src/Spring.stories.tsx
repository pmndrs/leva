import React from 'react'
import { StoryFn, Meta } from '@storybook/react'

// @ts-ignore
import Reset from '../../leva/stories/components/decorator-reset'
import { useControls } from 'leva'

import { spring } from './index'

export default {
  title: 'Plugins/Spring',
  decorators: [Reset],
} as Meta

const Template: StoryFn<ReturnType<typeof spring>> = (args) => {
  const values = useControls(
    {
      bar: spring({ tension: 100, friction: 30 }),
    },
    args
  )

  return (
    <div>
      <pre>{JSON.stringify(values, null, '  ')}</pre>
    </div>
  )
}

export const Spring = Template.bind({})
Spring.args = {}
