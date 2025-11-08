# Special Inputs

### Button

A simple button that executes a function when clicked. The function receives a `get` callback to access other control values:

```jsx
import { useControls, button } from 'leva'

const { number } = useControls({
  number: 3,
  foo: button((get) => alert(`Number value is ${get('number').toFixed(2)}`)),
})
```

Buttons can be disabled:

```jsx
const { foo } = useControls({
  foo: button(() => console.log('clicked'), { disabled: true }),
})
```

### Button Group

A group of buttons displayed horizontally. Useful for presets or quick actions:

```jsx
import { useControls, buttonGroup } from 'leva'

const [{ size }, set] = useControls(() => ({
  size: 1,
  ' ': buttonGroup({
    '0.25x': () => set({ size: 0.25 }),
    '0.5x': () => set({ size: 0.5 }),
    '1x': () => set({ size: 1 }),
    '2x': () => set({ size: 2 }),
    '3x': () => set({ size: 3 }),
  }),
}))
```

You can also provide a custom label:

```jsx
const { preset } = useControls(() => ({
  preset: buttonGroup({
    label: 'Presets',
    opts: {
      low: () => set({ quality: 'low' }),
      medium: () => set({ quality: 'medium' }),
      high: () => set({ quality: 'high' }),
    },
  }),
}))
```

### Monitor

A monitor displays the current value of a ref or the result of a function. Useful for debugging or displaying live data:

```jsx
import { useControls, monitor } from 'leva'
import { useRef } from 'react'

function MyComponent() {
  const frameCount = useRef(0)

  // Monitor a ref
  useControls({
    frameCount: monitor(frameCount, { graph: true }),
  })

  // Update the ref
  useEffect(() => {
    const interval = setInterval(() => {
      frameCount.current++
    }, 100)
    return () => clearInterval(interval)
  }, [])
}
```

Monitor a function that returns a value:

```jsx
const noise = () => Math.random() * 100

useControls({
  noise: monitor(noise, { graph: true, interval: 30 }),
})
```

Monitor settings:

- `graph`: Show a graph visualization (default: `false`)
- `interval`: Update interval in milliseconds (default: `100`)
