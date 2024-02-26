import React, { useEffect } from 'react'
import Reset from './components/decorator-reset'
import { Story, Meta } from '@storybook/react'

import { levaStore, useControls } from '../src'

export default {
  title: 'Hook/Caching',
  decorators: [Reset],
} as Meta

const Controls = () => {
  const values = useControls({ num: 10, color: '#f00' })

  return (
    <div>
      <pre>{JSON.stringify(values, null, '  ')}</pre>
    </div>
  )
}

const Template: Story<any> = () => {
  const [mounted, toggle] = React.useState(true)
  const [cached, setCached] = React.useState(true)
  useEffect(() => {
    levaStore.disableCache(cached)
  }, [cached])
  return (
    <div>
      <button onClick={() => toggle((t) => !t)}>{mounted ? 'Unmount' : 'Mount'}</button>
      <button onClick={() => setCached((t) => !t)}>Cache {cached ? 'enabled' : 'disabled'}</button>
      {mounted && <Controls />}
    </div>
  )
}

export const Caching = Template.bind({})
