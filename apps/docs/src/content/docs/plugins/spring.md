---
title: Spring Plugin
description: Configure spring physics parameters with visual feedback
---

The Spring plugin provides an interactive editor for spring physics configurations, perfect for physics-based animations.

## Installation

```bash
npm install @leva-ui/plugin-spring
```

## Basic Usage

```jsx
import { useControls } from 'leva'
import { spring } from '@leva-ui/plugin-spring'

function App() {
  const { springConfig } = useControls({
    springConfig: spring(),
  })

  // Use with animation libraries
  return <AnimatedComponent config={springConfig} />
}
```

## Default Values

Provide initial spring parameters:

```jsx
const { springConfig } = useControls({
  springConfig: spring({
    tension: 170,
    friction: 26,
  }),
})
```

## Return Value

The plugin returns an object with spring parameters:

```jsx
const { springConfig } = useControls({
  springConfig: spring(),
})

console.log(springConfig)
// {
//   tension: 170,
//   friction: 26,
//   mass: 1,
//   clamp: false,
//   precision: 0.01,
//   velocity: 0
// }
```

## React Spring Integration

Perfect for use with react-spring:

```jsx
import { useSpring, animated } from '@react-spring/web'
import { useControls } from 'leva'
import { spring } from '@leva-ui/plugin-spring'

function SpringAnimation() {
  const { config } = useControls({
    config: spring({ tension: 170, friction: 26 }),
  })

  const styles = useSpring({
    from: { x: 0 },
    to: { x: 100 },
    config: config, // Use spring config directly
  })

  return <animated.div style={styles} />
}
```

## Parameters

### Tension

Controls the spring's strength (stiffness):

- **Low values (50-100)**: Loose, bouncy springs
- **Medium values (150-200)**: Balanced motion
- **High values (300+)**: Stiff, quick springs

### Friction

Controls the spring's damping (resistance):

- **Low values (5-15)**: Oscillating, bouncy
- **Medium values (20-30)**: Smooth, controlled
- **High values (40+)**: Heavily damped, no bounce

### Mass

The mass of the animated object:

- **Default**: 1
- Higher mass = slower, heavier feeling
- Lower mass = faster, lighter feeling

### Velocity

Initial velocity of the spring:

- **Default**: 0
- Positive = starts moving forward
- Negative = starts moving backward

### Precision

When to consider the spring at rest:

- **Default**: 0.01
- Lower = more precise (longer animation)
- Higher = less precise (shorter animation)

### Clamp

Whether to prevent overshooting:

- **Default**: false
- `true` = no bounce/overshoot
- `false` = natural spring behavior with bounce

## Visual Editor

The plugin includes a visual preview showing:

- Spring motion curve
- Overshoot/bounce behavior
- Duration estimate
- Natural frequency

Adjust parameters and see results in real-time.

## Presets

Common spring configurations:

```jsx
// Gentle spring
spring({ tension: 120, friction: 14 })

// Default spring
spring({ tension: 170, friction: 26 })

// Wobbly spring
spring({ tension: 180, friction: 12 })

// Stiff spring
spring({ tension: 210, friction: 20 })

// Slow spring
spring({ tension: 280, friction: 60 })

// Molasses
spring({ tension: 280, friction: 120 })
```

## Complete Example

Full spring-based animation system:

```jsx
import { useControls, folder, button } from 'leva'
import { spring } from '@leva-ui/plugin-spring'
import { useSpring, animated } from '@react-spring/web'
import { useState } from 'react'

function App() {
  const [toggle, setToggle] = useState(false)

  const controls = useControls({
    animation: folder({
      springConfig: spring({ tension: 170, friction: 26 }),
      from: { value: 0, min: 0, max: 1000 },
      to: { value: 500, min: 0, max: 1000 },
    }),
    actions: folder({
      toggle: button(() => setToggle(!toggle)),
    }),
  })

  const styles = useSpring({
    x: toggle ? controls.animation.to : controls.animation.from,
    config: controls.animation.springConfig,
  })

  return (
    <animated.div
      style={{
        width: 50,
        height: 50,
        background: 'red',
        transform: styles.x.to((x) => `translateX(${x}px)`),
      }}
    />
  )
}
```

## Advanced: Multiple Springs

Different springs for different properties:

```jsx
import { folder } from 'leva'

const springs = useControls({
  springs: folder({
    position: spring({ tension: 170, friction: 26 }),
    scale: spring({ tension: 300, friction: 20 }),
    rotation: spring({ tension: 120, friction: 14 }),
  }),
})

const styles = useSpring({
  x: targetX,
  scale: targetScale,
  rotate: targetRotation,
  config: (key) => {
    if (key === 'x') return springs.springs.position
    if (key === 'scale') return springs.springs.scale
    return springs.springs.rotation
  },
})
```

## Comparison with Bezier

| Aspect       | Spring                       | Bezier                 |
| ------------ | ---------------------------- | ---------------------- |
| Feel         | Natural, physics-based       | Precise, controlled    |
| Duration     | Dynamic (depends on params)  | Fixed                  |
| Overshoot    | Can bounce/overshoot         | Follows curve exactly  |
| Interruption | Smooth mid-animation changes | Restart required       |
| Use Case     | Natural, playful motion      | Precise, choreographed |

## Tips

1. **Start with defaults**: `{ tension: 170, friction: 26 }` works for most cases
2. **Low friction = bouncy**: Great for playful, energetic UIs
3. **High tension + high friction = quick**: Snappy, responsive feel
4. **Test with real content**: Springs feel different at different scales
5. **Use presets as starting points**: Tweak from there

## Performance

Springs recalculate on each frame:

```jsx
// Use transient for real-time preview without re-renders
const { springConfig } = useControls({
  springConfig: spring({
    value: { tension: 170, friction: 26 },
    onChange: (config) => {
      // Update spring imperative
      springRef.current.config = config
    },
  }),
})
```

## Next Steps

- Compare with [Bezier Plugin](/plugins/bezier/)
- See [Plot Plugin](/plugins/plot/) for visualizing spring curves
- Learn about [Creating Plugins](/plugins/creating/)
