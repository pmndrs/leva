import { useRef } from 'react'
import { useControls } from 'leva'
import { Canvas } from '@react-three/fiber'
import { OrbitControls } from '@react-three/drei'

import * as THREE from 'three'

const torusknot = new THREE.TorusKnotGeometry(3, 0.8, 256, 16)

const Mesh = () => {
  const matRef = useRef()
  useControls({ color: { value: 'indianred', onChange: (v) => matRef.current && matRef.current.color.set(v) } })
  return (
    <mesh geometry={torusknot}>
      <meshPhysicalMaterial ref={matRef} attach="material" flatShading />
    </mesh>
  )
}

export default function App() {
  return (
    <Canvas
      pixelRatio={[1, 2]}
      camera={{ position: [0, 0, 16], fov: 50 }}
      style={{ background: 'dimgray', height: '100vh', width: '100vw' }}>
      <OrbitControls />
      <directionalLight />
      <Mesh />
    </Canvas>
  )
}
