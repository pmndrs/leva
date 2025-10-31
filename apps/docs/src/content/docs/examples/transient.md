---
title: Transient Updates
description: Optimize performance with transient updates
---

Transient updates allow you to defer state updates until the user finishes interacting with a control, preventing unnecessary re-renders during drag operations.

## Why Transient?

When animating or rendering expensive scenes (like 3D graphics), you may want to avoid re-rendering on every drag event. Transient mode only updates the value when the user releases the control.

## Example

```jsx
import React, { useRef } from 'react'
import { useControls } from 'leva'
import { Canvas } from '@react-three/fiber'
import { OrbitControls } from '@react-three/drei'
import * as THREE from 'three'

const torusknot = new THREE.TorusKnotGeometry(3, 0.8, 256, 16)

const Mesh = () => {
  const matRef = useRef()

  useControls({
    color: {
      value: 'indianred',
      // Use onChange instead of relying on re-renders
      onChange: (v) => {
        if (matRef.current) {
          matRef.current.color.set(v)
        }
      },
    },
  })

  return (
    <mesh geometry={torusknot}>
      <meshPhysicalMaterial ref={matRef} flatShading />
    </mesh>
  )
}

export default function App() {
  return (
    <Canvas camera={{ position: [0, 0, 16], fov: 50 }} style={{ height: '100vh', width: '100vw' }}>
      <OrbitControls />
      <directionalLight />
      <Mesh />
    </Canvas>
  )
}
```

## Using Transient Mode

There are two ways to handle transient updates:

### 1. onChange Callback

Respond to changes without triggering re-renders:

```jsx
useControls({
  rotation: {
    value: 0,
    onChange: (value) => {
      // Update imperative code (refs, external objects)
      mesh.rotation.y = value
    },
  },
})
```

### 2. Transient Flag

Prevent re-renders during drag, only update on release:

```jsx
useControls({
  rotation: {
    value: 0,
    transient: true, // Only updates on release
  },
})
```

### 3. Edit Lifecycle Callbacks

Fine-grained control over the edit lifecycle:

```jsx
useControls({
  rotation: {
    value: 0,
    onEditStart: (value) => {
      console.log('User started editing:', value)
    },
    onEditEnd: (value) => {
      console.log('User finished editing:', value)
      // Save to server, etc.
    },
  },
})
```

## Performance Benefits

### Without Transient

```jsx
// Component re-renders on every mouse move
const { rotation } = useControls({ rotation: 0 })

// Expensive render on every update
return <ExpensiveComponent rotation={rotation} />
```

Result: Potentially hundreds of re-renders per drag operation.

### With Transient

```jsx
// Component only re-renders on release
const { rotation } = useControls({
  rotation: { value: 0, transient: true },
})

return <ExpensiveComponent rotation={rotation} />
```

Result: Single re-render when user finishes dragging.

### With onChange (No Re-renders)

```jsx
// No component re-renders at all
const meshRef = useRef()

useControls({
  rotation: {
    value: 0,
    onChange: (v) => {
      meshRef.current.rotation.y = v
    },
  },
})

return <mesh ref={meshRef} />
```

Result: Zero re-renders, direct imperative updates.

## Use Cases

### 3D Graphics

Update Three.js objects directly:

```jsx
const lightRef = useRef()

useControls({
  intensity: {
    value: 1,
    min: 0,
    max: 5,
    onChange: (v) => {
      lightRef.current.intensity = v
    },
  },
})
```

### Canvas/WebGL

Update shader uniforms:

```jsx
const uniformsRef = useRef({ uTime: { value: 0 } })

useControls({
  time: {
    value: 0,
    min: 0,
    max: 10,
    onChange: (v) => {
      uniformsRef.current.uTime.value = v
    },
  },
})
```

### Audio

Control audio parameters:

```jsx
const audioContextRef = useRef()

useControls({
  volume: {
    value: 0.5,
    min: 0,
    max: 1,
    step: 0.01,
    onChange: (v) => {
      audioContextRef.current.gain.value = v
    },
  },
})
```

### External State

Update non-React state:

```jsx
import { store } from './store'

useControls({
  setting: {
    value: 'default',
    onEditEnd: (v) => {
      store.setSetting(v)
      api.saveSetting(v) // Network call only on release
    },
  },
})
```

## Best Practices

1. **Use `onChange` for imperative updates**: When working with refs or external objects
2. **Use `transient` for expensive renders**: When you need the value in React state but want to defer updates
3. **Use `onEditEnd` for side effects**: Network calls, localStorage, logging, etc.
4. **Combine approaches**: Use `onChange` for real-time preview and `onEditEnd` for persistence

## Common Patterns

### Real-time Preview + Persistence

```jsx
useControls({
  color: {
    value: '#fff',
    onChange: (v) => {
      // Real-time preview
      materialRef.current.color.set(v)
    },
    onEditEnd: (v) => {
      // Save to server when done
      api.saveColor(v)
    },
  },
})
```

### Undo/Redo Support

```jsx
useControls({
  value: {
    value: 0,
    onEditStart: (v) => {
      undoStack.push(v)
    },
    onEditEnd: (v) => {
      // Only committed value goes to history
      history.add(v)
    },
  },
})
```

## Next Steps

- Explore [Advanced Panels](/examples/advanced-panels/)
- Learn about [Input Types](/guides/inputs/)
- See [Configuration](/guides/configuration/)
