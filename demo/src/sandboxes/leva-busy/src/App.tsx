import React from 'react'
import { useControls, folder, button, monitor, Leva } from 'leva'
// @ts-ignore
import { Noise } from 'noisejs'
import styles from './styles.module.css'

const noise = new Noise(Math.random())

function frame() {
  const t = Date.now()
  return noise.simplex2(t / 1000, t / 100)
}

const ExtraControls = () => {
  const data = useControls('folder.subfolder', {
    'Hello Button': button(() => console.log('hello')),
    'deep nested': folder({
      pos2d: { x: 3, y: 4 },
      pos2dArr: [100, 200],
      pos3d: { x: 0.3, y: 0.1, z: 0.5 },
      pos3dArr: [Math.PI / 2, 20, 4],
    }),
  })
  return <pre>{JSON.stringify(data, null, '  ')}</pre>
}

function Controls() {
  const data = useControls({
    range: { value: 0, min: -10, max: 10 },
    image: { image: undefined },
    select: { options: ['x', 'y', ['x', 'y']] },
    interval: { min: -100, max: 100, value: [-10, 10] },
    color: '#ffffffff',
    refMonitor: monitor(frame, { graph: true, interval: 30 }),
    number: { value: 1000, min: 3 },
    colorObj: { r: 1, g: 2, b: 3 },
    folder: folder({
      boolean: false,
      spring: { tension: 100, friction: 30 },
      noJoy: { value: [1, 2], joystick: false },
    }),
  })
  return <pre>{JSON.stringify(data, null, '  ')}</pre>
}

export default function App() {
  const [count, setCount] = React.useState(0)
  const [show, setShow] = React.useState(true)

  const { hideTitleBar, oneLineLabels } = useControls({ hideTitleBar: false, oneLineLabels: false })

  return (
    <>
      <Leva hideTitleBar={hideTitleBar} oneLineLabels={oneLineLabels} />
      <div className={styles.buttons}>
        Reference count: {count}
        <button onClick={() => setCount((c) => Math.max(0, c - 1))}>-</button>
        <button onClick={() => setCount((c) => c + 1)}>+</button>
        <button onClick={() => setShow((s) => !s)}>Toggle Main Controls</button>
      </div>
      {show && <Controls />}
      {Array(count)
        .fill(0)
        .map((_, i) => (
          <ExtraControls key={i} />
        ))}
    </>
  )
}
