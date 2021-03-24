import React from 'react'
import { useControls } from 'leva'
import { bezier } from '@leva-ui/plugin-bezier'

export default function App() {
  const { curve } = useControls({ curve: bezier() })

  return (
    <div className="App">
      <pre>{JSON.stringify(curve, null, '  ')}</pre>
    </div>
  )
}
