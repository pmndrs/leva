import React from 'react'
import { useControls, folder, button, monitor, Leva } from 'leva'
import { Noise } from 'noisejs'
import { TooltipProvider } from '@radix-ui/react-tooltip'

const noise = new Noise(Math.random())

function frame() {
  const t = Date.now()
  return noise.simplex2(t / 1000, t / 100)
}

export default function App() {
  const data = useControls({
    first: { value: 0, min: -10, max: 10 },
    image: { image: undefined },
    select: { options: ['x', 'y', ['x', 'y']] },
    interval: { min: -100, max: 100, value: [-10, 10] },
    color: '#ffffff',
    refMonitor: monitor(frame, { graph: true, interval: 30 }),
    number: { value: 1000, min: 3 },
    folder2: folder({
      boolean: false,
      spring: { tension: 100, friction: 30 },
      folder3: folder(
        {
          // eslint-disable-next-line no-console
          'Hello Button': button(() => console.log('hello')),
          folder4: folder({
            pos2d: { x: 3, y: 4 },
            pos2dArr: [100, 200],
            pos3d: { x: 0.3, y: 0.1, z: 0.5 },
            pos3dArr: [Math.PI / 2, 20, 4],
          }),
        },
        { collapsed: false }
      ),
    }),
    colorObj: { r: 1, g: 2, b: 3 },
  })

  return (
    <TooltipProvider>
      <Leva oneLineLabels />

      <div className="App">
        <pre>{JSON.stringify(data, null, '  ')}</pre>
      </div>
    </TooltipProvider>
  )
}
