---
title: Plot Plugin
description: Create interactive data plots and visualizations
---

The Plot plugin provides interactive graph and data visualization capabilities for monitoring values, expressions, and functions.

## Installation

```bash
npm install @leva-ui/plugin-plot
```

## Basic Usage

```jsx
import { useControls } from 'leva'
import { plot } from '@leva-ui/plugin-plot'

function App() {
  const { data } = useControls({
    data: plot({
      expression: 'Math.sin(x)',
      graph: true,
    }),
  })
}
```

## Features

The Plot plugin can:

- Visualize mathematical expressions
- Plot data arrays
- Monitor live values with graphs
- Display function curves
- Show real-time data streams

## Expression Plotting

Plot mathematical functions:

```jsx
const { curve } = useControls({
  sine: plot({
    expression: 'Math.sin(x)',
    min: -Math.PI,
    max: Math.PI,
    graph: true,
  }),
})
```

### Supported Expressions

Any valid JavaScript expression with `x` as the variable:

```jsx
// Trigonometric
plot({ expression: 'Math.sin(x)' })
plot({ expression: 'Math.cos(x * 2)' })
plot({ expression: 'Math.tan(x / 4)' })

// Polynomial
plot({ expression: 'x * x' })
plot({ expression: 'x ** 3 - x' })

// Complex
plot({ expression: 'Math.sin(x) * Math.exp(-x/10)' })
plot({ expression: 'Math.abs(x) * Math.cos(x)' })
```

## Data Array Plotting

Plot arrays of data:

```jsx
const { data } = useControls({
  signal: plot({
    value: [0, 10, 5, 15, 8, 12, 3, 7],
    graph: true,
  }),
})
```

## Real-time Monitoring

Monitor changing values with graph history:

```jsx
import { useRef, useEffect } from 'react'
import { monitor } from 'leva'

function App() {
  const valueRef = useRef(0)

  useEffect(() => {
    const interval = setInterval(() => {
      valueRef.current = Math.sin(Date.now() / 1000)
    }, 16)
    return () => clearInterval(interval)
  }, [])

  useControls({
    signal: monitor(valueRef, {
      graph: true,
      interval: 30,
    }),
  })
}
```

## Configuration Options

### Graph Display

```jsx
plot({
  expression: 'Math.sin(x)',
  graph: true, // Show/hide graph
  min: -10, // X-axis minimum
  max: 10, // X-axis maximum
  samples: 100, // Number of points
})
```

### Styling

```jsx
plot({
  expression: 'x * x',
  strokeColor: '#ff0000', // Line color
  strokeWidth: 2, // Line thickness
  fillColor: 'rgba(255,0,0,0.1)', // Fill under curve
})
```

## Use Cases

### Performance Monitoring

Monitor FPS and performance metrics:

```jsx
import { monitor } from 'leva'
import { useRef, useEffect } from 'react'

function App() {
  const fpsRef = useRef({ fps: 0 })

  useEffect(() => {
    let lastTime = Date.now()
    let frames = 0

    function updateFPS() {
      frames++
      const now = Date.now()

      if (now - lastTime >= 1000) {
        fpsRef.current.fps = frames
        frames = 0
        lastTime = now
      }

      requestAnimationFrame(updateFPS)
    }

    updateFPS()
  }, [])

  useControls({
    performance: monitor(fpsRef, {
      graph: true,
      interval: 100,
    }),
  })
}
```

### Signal Processing

Visualize audio or sensor data:

```jsx
function AudioVisualizer() {
  const audioDataRef = useRef([])

  // Update from audio analyzer
  useEffect(() => {
    // ... get audio data
    audioDataRef.current = frequencyData
  }, [])

  useControls({
    spectrum: plot({
      value: audioDataRef.current,
      graph: true,
    }),
  })
}
```

### Mathematical Exploration

Explore functions interactively:

```jsx
import { folder } from 'leva'

const { params } = useControls({
  function: folder({
    amplitude: { value: 1, min: 0, max: 5 },
    frequency: { value: 1, min: 0.1, max: 10 },
    phase: { value: 0, min: 0, max: Math.PI * 2 },

    plot: plot({
      expression: `${params.amplitude} * Math.sin(${params.frequency} * x + ${params.phase})`,
      min: -Math.PI * 2,
      max: Math.PI * 2,
      graph: true,
    }),
  }),
})
```

### Animation Curves

Visualize easing functions:

```jsx
const { easing } = useControls({
  easing: plot({
    expression: 't => t < 0.5 ? 2 * t * t : -1 + (4 - 2 * t) * t',
    min: 0,
    max: 1,
    graph: true,
  }),
})
```

## Combining with Other Inputs

Create comprehensive data dashboards:

```jsx
import { folder, monitor, button } from 'leva'

function Dashboard() {
  const metricsRef = useRef({ cpu: 0, memory: 0, network: 0 })

  useControls({
    realtime: folder({
      cpu: monitor(metricsRef, { graph: true, interval: 100 }),
      memory: monitor(metricsRef, { graph: true, interval: 100 }),
    }),

    functions: folder({
      sin: plot({ expression: 'Math.sin(x)', graph: true }),
      cos: plot({ expression: 'Math.cos(x)', graph: true }),
    }),

    actions: folder({
      reset: button(() => resetMetrics()),
      export: button(() => exportData()),
    }),
  })
}
```

## Tips

1. **Choose appropriate ranges**: Set min/max to show interesting parts
2. **Sample rate matters**: More samples = smoother curves, but slower
3. **Color code related plots**: Use consistent colors for related data
4. **Combine with monitors**: Use monitors for live data, plot for functions
5. **Keep expressions simple**: Complex expressions may slow updates

## Performance

For real-time data:

```jsx
// Use transient to avoid re-renders
plot({
  value: data,
  transient: true,
  onChange: (newData) => {
    // Handle data imperatively
    updateChart(newData)
  },
})
```

## Next Steps

- Learn about [Bezier Plugin](/plugins/bezier/) for animation curves
- See [Spring Plugin](/plugins/spring/) for physics visualization
- Explore [Creating Plugins](/plugins/creating/)
