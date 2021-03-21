import React from 'react'
import { useControls, monitor } from 'leva'
import { plot } from '@leva-ui/plugin-plot'

export default function App() {
  const p = React.useRef(performance.now())
  const values = useControls({
    w: 1,
    y1: plot({ expression: 'cos(x*w)', boundsX: [-10, 10] }),
    y2: plot({ expression: 'x * y1', boundsX: [-100, 100] }),
    y3: plot({ expression: 'tan(y2)', boundsX: [-4, 4], boundsY: [-10, 10] }),
  })

  useControls(
    {
      'y1(t)': monitor(
        () => {
          const t = performance.now() - p.current
          return values.y1(t / 100)
        },
        { graph: true, interval: 30 }
      ),
    },
    [values.y1]
  )

  const t1 = values.y1(1)
  const t2 = values.y2(1)
  const t3 = values.y3(1)
  return (
    <div className="App">
      <pre>y1(1) = {t1}</pre>
      <pre>y2(1) = {t2}</pre>
      <pre>y3(1) = {t3}</pre>
    </div>
  )
}
