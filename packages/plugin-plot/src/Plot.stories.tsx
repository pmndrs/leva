import React from 'react'
import { Meta } from '@storybook/react'

import Reset from '../../leva/stories/components/decorator-reset'
import { useControls } from '../../leva/src'

import { plot } from './index'

export default {
  title: 'Plugins/Plot',
  decorators: [Reset],
} as Meta

export const Plot = () => {
  const values = useControls({ curve: plot('x') })

  return (
    <div>
      <pre>{JSON.stringify(values, null, '  ')}</pre>
    </div>
  )
}
