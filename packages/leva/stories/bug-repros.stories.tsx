import React, { StrictMode, useState } from 'react'
import Reset from './components/decorator-reset'
import { Meta } from '@storybook/react'
import { Leva, LevaPanel, useControls, useCreateStore, folder } from '../src'

export default {
  title: 'Dev/BugRepro',
  decorators: [Reset],
} as Meta

// https://github.com/pmndrs/leva/issues/456
export const NeverHideWithDynamicDependencies = () => {
  const [n, setN] = useState(0)
  const inputs = Array(n)
    .fill(0)
    .reduce((acc, _, i) => Object.assign(acc, { [`input${i}`]: i }), {})

  useControls(inputs, [n])

  return (
    <div className="App">
      <Leva neverHide />
      <button onClick={() => setN((n) => n + 1)}>Add input</button>
    </div>
  )
}

NeverHideWithDynamicDependencies.storyName = '456 / neverHide prop with dynamic controls'

// repro for https://github.com/pmndrs/leva/issues/538
export const DynamicDependencies = () => {
  const [layers, setLayers] = useState(1)

  const controls = {
    layers: {
      value: layers,
      step: 1,
      min: 0,
      max: 5,
      onChange: (v) => setLayers(v),
    },
  }

  Array.from({ length: layers }, (_, i) => {
    controls[`layer${i + 1}`] = {
      value: 0,
      step: 10,
    }
  })

  const result = useControls(controls, [layers])

  return (
    <div className="App">
      <pre>{JSON.stringify(result, null, '  ')}</pre>
    </div>
  )
}

DynamicDependencies.storyName = '538 / dynamic dependencies should update height'

// repro for https://github.com/pmndrs/leva/issues/540
const MyComponent = ({ store }) => {
  const controls = useControls(
    {
      color: '#00aa88',
      moreSettings: false,
      roughness: {
        value: 0.5,
        min: 0,
        max: 1,
        step: 0.01,
        render: (get) => get('moreSettings'),
      },
      metalness: {
        value: 0.5,
        min: 0,
        max: 1,
        step: 0.01,
        render: (get) => get('moreSettings'),
      },
    },
    { store }
  )

  return (
    <div>
      <pre>{JSON.stringify(controls, null, '  ')}</pre>
    </div>
  )
}

export const ConditionalControls = () => {
  const store = useCreateStore()

  return (
    <div className="App">
      <MyComponent store={store} />
      <LevaPanel store={store} />
    </div>
  )
}

ConditionalControls.storyName = '540 / conditional controls should work'

// repro for https://github.com/pmndrs/leva/issues/552
// Dynamic import to avoid build errors if @react-three/fiber is not installed
let Canvas: any = null
let Box: any = null

try {
  const fiber = require('@react-three/fiber')
  Canvas = fiber.Canvas

  // Simple box component that uses leva controls
  Box = ({ position }: { position: [number, number, number] }) => {
    const { scale, color, wireframe, rotation } = useControls('Mesh Settings', {
      scale: { value: 1, min: 0.1, max: 3, step: 0.1 },
      color: '#ff6b6b',
      rotation: { value: { x: 0, y: 0, z: 0 }, step: 0.01 },
      wireframe: false,
    })

    return (
      <mesh position={position} scale={scale} rotation={[rotation.x, rotation.y, rotation.z]}>
        <boxGeometry args={[1, 1, 1]} />
        <meshStandardMaterial color={color} wireframe={wireframe} />
      </mesh>
    )
  }
} catch (e) {
  // R3F not installed, story will show error message
}

export const StrictModeWithR3FCanvas = () => {
  if (!Canvas) {
    return (
      <div style={{ padding: 20, background: '#fff3cd', border: '2px solid #ffc107' }}>
        <h3>@react-three/fiber not installed</h3>
        <p>
          This story requires @react-three/fiber and three to be installed as dev dependencies.
          <br />
          Run: <code>npm install --save-dev @react-three/fiber three</code>
        </p>
      </div>
    )
  }

  return (
    <StrictMode>
      <div style={{ width: '100%', height: '100vh' }}>
        <div
          style={{
            position: 'absolute',
            top: 10,
            left: 10,
            zIndex: 1,
            padding: 10,
            background: '#fff3cd',
            border: '2px solid #ffc107',
            borderRadius: 4,
          }}>
          <strong>StrictMode Enabled</strong>
          <p style={{ margin: '5px 0 0 0', fontSize: '12px' }}>
            Controls should render correctly despite StrictMode's double-invocation.
          </p>
        </div>
        <Canvas>
          <ambientLight intensity={0.5} />
          <spotLight position={[10, 10, 10]} angle={0.15} penumbra={1} />
          <pointLight position={[-10, -10, -10]} />
          <Box position={[0, 0, 0]} />
        </Canvas>
      </div>
    </StrictMode>
  )
}

StrictModeWithR3FCanvas.storyName = '552 / StrictMode with R3F Canvas should render controls'
