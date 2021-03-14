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
  const values = useControls({ num: 5, curve: plot({ expression: 'cos(x)', boundsX: [-10, 10], boundsY: [-1, 1] }) })

  return (
    <div>
      <pre>{JSON.stringify(values, null, '  ')}</pre>
    </div>
  )
}
