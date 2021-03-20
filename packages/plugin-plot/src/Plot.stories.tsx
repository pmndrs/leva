import React from 'react'
import { Story, Meta } from '@storybook/react'

import Reset from '../../leva/stories/components/decorator-reset'
import { useControls } from '../../leva/src'

import { plot } from './index'

export default {
  title: 'Plugins/Plot',
  decorators: [Reset],
} as Meta

const Template: Story<any> = (args) => {
  const { curve } = useControls({ curve: plot(args) })
  const expr = curve.compile()
  return (
    <div>
      {[0, 0.5, -1].map((x) => (
        <pre key={x}>
          x = {x}, curve: {expr.evaluate({ x }).toFixed(2)}
        </pre>
      ))}
    </div>
  )
}

export const DefaultBounds = Template.bind({})
DefaultBounds.args = { expression: 'x' }

export const HideGraph = Template.bind({})
HideGraph.args = { expression: 'x', graph: false }

export const BoundsX = Template.bind({})
BoundsX.args = { expression: 'cos(x)', boundsX: [-10, 10] }

export const BoundsY = Template.bind({})
BoundsY.args = { expression: 'sin(x) * tan(x)', boundsX: [-10, 10], boundsY: [-1, 1] }

export const InputAsVariable = () => {
  const { curve } = useControls({ var: 10, curve: plot({ expression: 'cos(x * var)' }) })
  const expr = curve.compile()
  return (
    <div>
      {[0, 0.5, -1].map((x) => (
        <pre key={x}>
          x = {x}, curve: {expr.evaluate({ x }).toFixed(2)}
        </pre>
      ))}
    </div>
  )
}

export const CurveAsVariable = () => {
  const { curve } = useControls({
    var: 10,
    y1: plot({ expression: 'cos(x * var)' }),
    curve: plot({ expression: 'x * y1' }),
  })
  const expr = curve.compile()
  return (
    <div>
      {[0, 0.5, -1].map((x) => (
        <pre key={x}>
          x = {x}, curve: {expr.evaluate({ x }).toFixed(2)}
        </pre>
      ))}
    </div>
  )
}
