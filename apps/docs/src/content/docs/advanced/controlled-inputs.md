---
title: Controlled Inputs
description: Programmatically control Leva values from external sources
---

Leva supports controlled inputs, allowing you to update values from outside the GUI and sync external state with Leva.

## The `set` Function

To change Leva values programmatically, use the function form of `useControls` which returns a `set` function:

```jsx
const [values, set] = useControls(() => ({
  text: 'my string',
}))

// Update from external input
return <input type="text" value={values.text} onChange={(e) => set({ text: e.target.value })} />
```

## Basic Example

```jsx
import { useControls } from 'leva'

function App() {
  const [{ count }, set] = useControls(() => ({
    count: 0,
  }))

  return (
    <div>
      <p>Count: {count}</p>
      <button onClick={() => set({ count: count + 1 })}>Increment</button>
    </div>
  )
}
```

The Leva GUI will reflect the new value when you click the button.

## The `onChange` Callback

For performance-critical scenarios, use `onChange` to handle changes imperatively without triggering React re-renders:

```jsx
const divRef = useRef(null)

useControls({
  color: {
    value: '#f00',
    onChange: (v) => {
      // Imperatively update DOM
      divRef.current.style.color = v
    },
  },
})

return <div ref={divRef}>Colored text</div>
```

:::note
When using `onChange`, the value is **not** returned from `useControls` by default. This prevents unnecessary re-renders.
:::

## onChange with Transient

If you need both the `onChange` callback and the return value, use `transient: false`:

```jsx
const divRef = useRef(null)

const { color } = useControls({
  color: {
    value: '#f00',
    onChange: (v) => {
      divRef.current.style.color = v
    },
    transient: false, // Now color is returned
  },
})

// color is now defined
```

## Combining set and onChange

Powerful pattern for bidirectional sync with imperative APIs:

```jsx
import { useDrag } from '@use-gesture/react'

function DraggableCircle() {
  const circleRef = useRef()

  const [{ position }, set] = useControls(() => ({
    position: {
      value: { x: 0, y: 0 },
      onChange: (value) => {
        // Update circle position when GUI changes
        if (circleRef.current) {
          circleRef.current.style.transform = `translate(${value.x}px, ${value.y}px)`
        }
      },
    },
  }))

  // Update GUI when circle is dragged
  useDrag(
    ({ offset: [x, y] }) => {
      set({ position: { x, y } })
    },
    { target: circleRef }
  )

  return (
    <div
      ref={circleRef}
      style={{
        width: 50,
        height: 50,
        borderRadius: '50%',
        background: 'red',
        position: 'absolute',
        cursor: 'grab',
      }}
    />
  )
}
```

In this example:

1. Dragging the circle updates the GUI
2. Changing the GUI updates the circle
3. No React re-renders during drag

## External State Management

### With useState

```jsx
function App() {
  const [color, setColor] = useState('#ff0000')

  // Initialize with external state
  const [, set] = useControls(() => ({
    color: color,
  }))

  // Sync external changes to Leva
  useEffect(() => {
    set({ color })
  }, [color, set])

  // Or handle changes
  const [values] = useControls(() => ({
    color: {
      value: color,
      onChange: (v) => setColor(v),
      transient: false,
    },
  }))
}
```

### With Zustand

```jsx
import create from 'zustand'

const useStore = create((set) => ({
  position: { x: 0, y: 0 },
  setPosition: (position) => set({ position }),
}))

function App() {
  const position = useStore((s) => s.position)
  const setPosition = useStore((s) => s.setPosition)

  useControls(() => ({
    position: {
      value: position,
      onChange: setPosition,
    },
  }))
}
```

### With Redux

```jsx
import { useSelector, useDispatch } from 'react-redux'

function App() {
  const settings = useSelector((state) => state.settings)
  const dispatch = useDispatch()

  useControls(() => ({
    quality: {
      value: settings.quality,
      options: ['low', 'medium', 'high'],
      onChange: (value) => {
        dispatch({ type: 'SET_QUALITY', payload: value })
      },
    },
  }))
}
```

## Batch Updates

Update multiple values at once:

```jsx
const [, set] = useControls(() => ({
  x: 0,
  y: 0,
  z: 0,
}))

// Batch update
const resetPosition = () => {
  set({
    x: 0,
    y: 0,
    z: 0,
  })
}
```

## Conditional Updates

Only update when certain conditions are met:

```jsx
const [{ auto, value }, set] = useControls(() => ({
  auto: false,
  value: 0,
}))

useEffect(() => {
  if (auto) {
    const interval = setInterval(() => {
      set({ value: Math.random() * 100 })
    }, 1000)

    return () => clearInterval(interval)
  }
}, [auto, set])
```

## Animation Integration

### With react-spring

```jsx
import { useSpring, animated } from '@react-spring/web'

function App() {
  const [spring, api] = useSpring(() => ({ x: 0 }))

  useControls(() => ({
    position: {
      value: 0,
      min: 0,
      max: 100,
      onChange: (value) => {
        api.start({ x: value })
      },
    },
  }))

  return (
    <animated.div
      style={{
        transform: spring.x.to((x) => `translateX(${x}px)`),
      }}>
      Animated
    </animated.div>
  )
}
```

### With Framer Motion

```jsx
import { motion, useAnimation } from 'framer-motion'

function App() {
  const controls = useAnimation()

  useControls(() => ({
    x: {
      value: 0,
      min: 0,
      max: 100,
      onChange: (value) => {
        controls.start({ x: value })
      },
    },
  }))

  return <motion.div animate={controls}>Animated</motion.div>
}
```

## Three.js Integration

```jsx
import { useRef } from 'react'
import { useFrame } from '@react-three/fiber'

function Mesh() {
  const meshRef = useRef()

  useControls(() => ({
    rotation: {
      value: { x: 0, y: 0, z: 0 },
      onChange: (value) => {
        if (meshRef.current) {
          meshRef.current.rotation.x = value.x
          meshRef.current.rotation.y = value.y
          meshRef.current.rotation.z = value.z
        }
      },
    },
  }))

  return (
    <mesh ref={meshRef}>
      <boxGeometry />
      <meshStandardMaterial />
    </mesh>
  )
}
```

## Edit Lifecycle Hooks

Fine-grained control over the edit lifecycle:

```jsx
useControls(() => ({
  value: {
    value: 50,
    onEditStart: (value, path, context) => {
      console.log('User started editing:', value)
      // Show preview, start recording, etc.
    },
    onEditEnd: (value, path, context) => {
      console.log('User finished editing:', value)
      // Commit to database, end recording, etc.
    },
  },
}))
```

## Common Patterns

### Debounced Updates

```jsx
import { useMemo } from 'react'
import debounce from 'lodash/debounce'

function App() {
  const saveToServer = useMemo(
    () =>
      debounce((value) => {
        fetch('/api/save', {
          method: 'POST',
          body: JSON.stringify({ value }),
        })
      }, 1000),
    []
  )

  useControls(() => ({
    setting: {
      value: 'default',
      onChange: saveToServer,
    },
  }))
}
```

### Undo/Redo

```jsx
function App() {
  const [history, setHistory] = useState([])
  const [historyIndex, setHistoryIndex] = useState(-1)

  const [{ value }, set] = useControls(() => ({
    value: {
      value: 0,
      onEditEnd: (v) => {
        const newHistory = history.slice(0, historyIndex + 1)
        newHistory.push(v)
        setHistory(newHistory)
        setHistoryIndex(newHistory.length - 1)
      },
    },
  }))

  const undo = () => {
    if (historyIndex > 0) {
      const newIndex = historyIndex - 1
      setHistoryIndex(newIndex)
      set({ value: history[newIndex] })
    }
  }

  const redo = () => {
    if (historyIndex < history.length - 1) {
      const newIndex = historyIndex + 1
      setHistoryIndex(newIndex)
      set({ value: history[newIndex] })
    }
  }

  return (
    <>
      <button onClick={undo}>Undo</button>
      <button onClick={redo}>Redo</button>
    </>
  )
}
```

## Best Practices

1. **Use `onChange` for imperative updates**: Avoids re-renders
2. **Use `set` for external updates**: Keep GUI in sync
3. **Combine both for bidirectional sync**: External APIs ↔ Leva
4. **Use `onEditEnd` for persistence**: Save only when done editing
5. **Debounce expensive operations**: Network calls, heavy computations

## Next Steps

- Learn about [TypeScript](/advanced/typescript/) support
- See [Transient Updates](/examples/transient/) example
- Explore [Custom Plugins](/advanced/custom-plugin/)
