import React from 'react'
import { useControls } from 'leva'
import { plot } from '@leva-ui/plugin-plot'

export default function App() {
  const values = useControls({ num: 5, curve: plot({ expression: 'cos(x)', boundsX: [-10, 10], boundsY: [-1, 1] }) })

  return (
    <div className="App">
      <pre>{JSON.stringify(values, null, '  ')}</pre>
    </div>
  )
}
