---
title: Plugins
description:
nav: 0
---

# Plugins

Plugins extend Leva with custom input types beyond the built-in primitives. They allow you to create specialized controls for specific use cases.

## Available Plugins

### Bezier Plugin

A cubic bezier curve editor for animation timing functions.

**Installation:**

```bash
npm i @leva-ui/plugin-bezier
```

**Usage:**

```jsx
import { useControls } from 'leva'
import { bezier } from '@leva-ui/plugin-bezier'

function MyComponent() {
  const { curve } = useControls({
    curve: bezier(), // Default cubic bezier
    // or with initial values
    curve: bezier([0.54, 0.05, 0.6, 0.98]),
    // or with preset
    curve: bezier('in-out-quadratic'),
    // or with options
    curve: bezier({
      handles: [0.54, 0.05, 0.6, 0.98],
      graph: false,
    }),
  })

  // Evaluate the curve at a point (0-1)
  const value = curve.evaluate(0.3)

  // Use as CSS easing function
  return <div style={{ animationTimingFunction: curve.cssEasing }} />
}
```

### Spring Plugin

A spring physics configuration editor.

**Installation:**

```bash
npm i @leva-ui/plugin-spring
```

**Usage:**

```jsx
import { useControls } from 'leva'
import { spring } from '@leva-ui/plugin-spring'

function MyComponent() {
  const { mySpring } = useControls({
    mySpring: spring({
      tension: 100,
      friction: 30,
      mass: 1,
    }),
  })

  // Returns a spring configuration object
  return <div>{mySpring.toString()}</div>
}
```

### Plot Plugin

A mathematical function plotter and evaluator.

**Installation:**

```bash
npm i @leva-ui/plugin-plot
```

**Usage:**

```jsx
import { useControls } from 'leva'
import { plot } from '@leva-ui/plugin-plot'

function MyComponent() {
  const { y } = useControls({
    y: plot({
      expression: 'cos(x)',
      graph: true,
      boundsX: [-10, 10],
      boundsY: [0, 100],
    }),
  })

  // Evaluate the function at a point
  const result = y(Math.PI)

  return <div>cos(π) = {result}</div>
}
```

### Dates Plugin

A date and time picker.

**Installation:**

```bash
npm i @leva-ui/plugin-dates
```

**Usage:**

```jsx
import { useControls } from 'leva'
import { date } from '@leva-ui/plugin-dates'

function MyComponent() {
  const { myDate } = useControls({
    myDate: date(new Date()),
  })

  return <div>Selected: {myDate.toLocaleDateString()}</div>
}
```

## How to Use Plugins

1. **Install the plugin package:**

   ```bash
   npm i @leva-ui/plugin-bezier
   ```

2. **Import and use in your schema:**

   ```jsx
   import { bezier } from '@leva-ui/plugin-bezier'

   const { curve } = useControls({
     curve: bezier(),
   })
   ```

3. **Use the returned value:**
   Plugins return typed values that you can use in your application logic.

## Plugin Properties

Plugins integrate seamlessly with Leva's input options:

```jsx
const { curve } = useControls({
  curve: bezier({
    handles: [0.54, 0.05, 0.6, 0.98],
    label: 'Animation Curve',
    hint: 'Adjust the bezier handles',
    render: (get) => get('enableAnimation'),
  }),
})
```

## Finding Plugins

Check the [Leva GitHub repository](https://github.com/pmndrs/leva) for official plugins and community-contributed ones. Official plugins are maintained in the `packages/` directory.

## Creating Your Own Plugin

See the [Creating Plugins](advanced/creating-plugins.md) guide for instructions on building custom plugins.
