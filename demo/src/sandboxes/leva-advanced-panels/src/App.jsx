import React from 'react'
import { useControls, useStoreContext, useCreateStore, LevaPanel, LevaStoreProvider } from 'leva'

function MyComponent() {
  const store = useStoreContext()
  useControls({ point: [0, 0] }, { store })
  return null
}

export default function App() {
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
