import React, { Suspense, useRef } from 'react'
import { Canvas } from 'react-three-fiber'
import { useControls } from 'leva'
import { OrbitControls, ContactShadows, useCubeTexture, Octahedron } from '@react-three/drei'

function Octa({ envMap }) {
  const mesh = useRef()
  const { position } = useControls('Oct', { position: [0, 0] })

  return (
    <Octahedron ref={mesh} args={[1, 6]} position={[...position, 0]}>
      <meshPhysicalMaterial color={'#f51d63'} envMap={envMap} metalness={1} roughness={0} />
    </Octahedron>
  )
}

function Scene() {
  const envMap = useCubeTexture(['px.png', 'nx.png', 'py.png', 'ny.png', 'pz.png', 'nz.png'], { path: '/cube/' })

  return (
    <Suspense fallback={null}>
      <Octa envMap={envMap} />
    </Suspense>
  )
}

export default function Scene3D() {
  return (
    <Canvas camera={{ position: [0, 0, 6], fov: 60 }}>
      <fog attach="fog" args={['white', 10, 40]} />

      <ambientLight intensity={0.5} />

      <ContactShadows
        rotation={[Math.PI / 2, 0, 0]}
        position={[0, -1.2, 0]}
        opacity={0.5}
        width={12}
        height={12}
        blur={1}
        far={2}
        resolution={512}
      />

      <OrbitControls maxPolarAngle={Math.PI / 2} />
      <Suspense fallback={null}>
        <Scene />
      </Suspense>
    </Canvas>
  )
}
