import React from 'react'
import { useControls } from 'leva'
import { plot } from '@leva-ui/plugin-plot'

export default function App() {
  const values = useControls({
    w: 5,
    y1: plot({ expression: 'cos(x)', boundsX: [-10, 10] }),
    y2: plot({ expression: '1/x', boundsX: [-10, 10] }),
  })
  const t1 = values.y1.evaluate({ x: 1 })
  const t2 = values.y2.evaluate({ x: 1 })
  return (
    <div className="App">
      <pre>x = 1 → y1 = {t1}</pre>
      <pre>x = 1 → y2 = {t2}</pre>
    </div>
  )
}
