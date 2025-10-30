---
title: Bezier Plugin
description: Create and edit cubic bezier curves for animations
---

The Bezier plugin provides an interactive editor for cubic bezier easing curves, commonly used for CSS and JavaScript animations.

## Installation

```bash
npm install @leva-ui/plugin-bezier
```

## Basic Usage

```jsx
import { useControls } from 'leva'
import { bezier } from '@leva-ui/plugin-bezier'

function App() {
  const { curve } = useControls({
    curve: bezier(),
  })

  return (
    <div
      className="animated-element"
      style={{
        animationTimingFunction: curve.cssEasing,
      }}>
      I animate with a custom curve!
    </div>
  )
}
```

## Default Values

Provide initial control points:

```jsx
const { curve } = useControls({
  curve: bezier([0.25, 0.1, 0.25, 1.0]), // [x1, y1, x2, y2]
})
```

Or use named presets:

```jsx
const { curve } = bezier('ease-in-out')
```

## Return Value

The plugin returns an object with multiple formats:

```jsx
const { curve } = useControls({ curve: bezier() })

console.log(curve)
// {
//   points: [0.25, 0.1, 0.25, 1.0],
//   cssEasing: 'cubic-bezier(0.25, 0.1, 0.25, 1.0)',
//   easing: (t) => { /* easing function */ }
// }
```

### Properties

- **`points`**: Array of four numbers `[x1, y1, x2, y2]`
- **`cssEasing`**: CSS-ready string for use in styles
- **`easing`**: JavaScript easing function `(t: number) => number`

## CSS Integration

Use directly in CSS-in-JS:

```jsx
import { animated, useSpring } from '@react-spring/web'

function AnimatedComponent() {
  const { curve } = useControls({ curve: bezier([0.4, 0, 0.2, 1]) })

  const styles = useSpring({
    from: { x: 0 },
    to: { x: 100 },
    config: { easing: curve.easing },
  })

  return <animated.div style={styles} />
}
```

Or in traditional CSS:

```jsx
function App() {
  const { curve } = useControls({ curve: bezier() })

  return (
    <style>{`
      .element {
        transition: transform 1s ${curve.cssEasing};
      }
    `}</style>
  )
}
```

## JavaScript Animations

Use the easing function directly:

```jsx
function animate(curve) {
  const start = Date.now()
  const duration = 1000

  function frame() {
    const elapsed = Date.now() - start
    const progress = Math.min(elapsed / duration, 1)

    // Apply easing
    const easedProgress = curve.easing(progress)

    element.style.transform = `translateX(${easedProgress * 100}px)`

    if (progress < 1) requestAnimationFrame(frame)
  }

  frame()
}

const { curve } = useControls({ curve: bezier() })
animate(curve)
```

## Interactive Editor

The plugin provides a visual editor where you can:

- Drag control points to shape the curve
- See the curve preview in real-time
- Copy the CSS value
- Use common presets

### Presets

Common easing presets are available:

```jsx
// Named presets
bezier('linear') // [0, 0, 1, 1]
bezier('ease') // [0.25, 0.1, 0.25, 1]
bezier('ease-in') // [0.42, 0, 1, 1]
bezier('ease-out') // [0, 0, 0.58, 1]
bezier('ease-in-out') // [0.42, 0, 0.58, 1]
```

## Advanced: Multiple Curves

Manage multiple easing curves:

```jsx
import { folder } from 'leva'

const easings = useControls({
  easings: folder({
    enter: bezier([0.4, 0, 0.2, 1]),
    exit: bezier([0.4, 0, 1, 1]),
    bounce: bezier([0.68, -0.55, 0.265, 1.55]),
  })
})

// Use different curves for different animations
<div style={{
  animationTimingFunction: easings.easings.enter.cssEasing
}}>
  Enters smoothly
</div>
```

## Real-World Example

Complete animation system:

```jsx
import { useControls, folder } from 'leva'
import { bezier } from '@leva-ui/plugin-bezier'

function App() {
  const config = useControls({
    animation: folder({
      duration: { value: 1, min: 0.1, max: 5, step: 0.1 },
      delay: { value: 0, min: 0, max: 2, step: 0.1 },
      curve: bezier([0.4, 0, 0.2, 1]),
    }),
  })

  return (
    <div
      style={{
        transition: `all ${config.animation.duration}s ${config.animation.curve.cssEasing} ${config.animation.delay}s`,
      }}>
      Fully configurable animation
    </div>
  )
}
```

## Options

Configure the bezier input:

```jsx
const { curve } = useControls({
  curve: bezier({
    value: [0.25, 0.1, 0.25, 1.0],
    label: 'Easing Curve',
    hint: 'Custom animation timing function',
  }),
})
```

## Tips

- Use shallow curves for subtle, natural motion
- Steep curves create snappy, responsive feels
- Overshooting curves (y > 1) create bounce effects
- Test curves with different durations

## Next Steps

- Try the [Spring Plugin](/plugins/spring/) for physics-based motion
- See the [Plot Plugin](/plugins/plot/) for data visualization
- Learn about [Creating Plugins](/plugins/creating/)
