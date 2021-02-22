import React from 'react'
import Reset from './components/decorator-reset'
import { Story, Meta } from '@storybook/react'

import { useControls } from '../src'

export default {
  title: 'Hook/Dependency',
  decorators: [Reset],
} as Meta

const Template: Story<any> = () => {
  const [n, setN] = React.useState(1)
  const inputs = Array(n)
    .fill(0)
    .reduce((acc, _, i) => Object.assign(acc, { [`input${i}`]: i }), {})

  const values = useControls(inputs, [n])

  return (
    <div>
      <button onClick={() => setN((n) => n + 1)}>Add input</button>
      <pre>{JSON.stringify(values, null, '  ')}</pre>
    </div>
  )
}

export const Deps = Template.bind({})
