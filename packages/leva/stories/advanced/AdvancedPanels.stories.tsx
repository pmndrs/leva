import React from 'react'
import Reset from '../components/decorator-reset'
import { Meta } from '@storybook/react'
import { useControls, useStoreContext, useCreateStore, LevaPanel, LevaStoreProvider } from '../../src'

export default {
  title: 'Advanced/Advanced Panels',
  decorators: [Reset],
} as Meta

function MyComponent() {
  const store = useStoreContext()
  useControls({ point: [0, 0] }, { store })
  return null
}

export const Default = () => {
  const store1 = useCreateStore()
  const store2 = useCreateStore()
  useControls({ color: '#fff' }, { store: store1 })
  useControls({ boolean: true }, { store: store2 })
  return (
    <div
      style={{
        display: 'grid',
        width: 300,
        gridRowGap: 10,
        padding: 10,
        background: '#fff',
      }}>
      <LevaPanel store={store1} fill flat titleBar={false} />
      <LevaPanel store={store2} fill flat titleBar={false} />
      <LevaStoreProvider store={store1}>
        <MyComponent />
      </LevaStoreProvider>
    </div>
  )
}
