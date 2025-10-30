---
title: Scroll Integration
description: Integrating Leva with scroll-driven animations
---

This example demonstrates how to use Leva with scroll-driven animations and dynamic content.

## Overview

Leva can be used to control parameters that drive scroll-based animations, parallax effects, or any scroll-synchronized behavior.

## Basic Example

```jsx
import { useControls } from 'leva'
import { useScroll } from '@react-spring/web'
import { useEffect } from 'react'

export default function App() {
  const { scrollY } = useScroll()

  const { speed, parallax } = useControls({
    speed: { value: 1, min: 0.1, max: 5, step: 0.1 },
    parallax: { value: 0.5, min: 0, max: 1, step: 0.1 },
  })

  useEffect(() => {
    const handleScroll = () => {
      const scrollPos = window.scrollY * speed * parallax
      // Apply scroll-driven transforms
      document.querySelector('.element').style.transform = `translateY(${scrollPos}px)`
    }

    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [speed, parallax])

  return (
    <div style={{ height: '300vh' }}>
      <div className="element">Scroll-driven content</div>
    </div>
  )
}
```

## Use Cases

### Parallax Effects

Control parallax intensity and speed:

```jsx
const config = useControls({
  parallaxSpeed: { value: 0.5, min: 0, max: 2 },
  parallaxLayers: { value: 3, min: 1, max: 10, step: 1 },
})
```

### Scroll Animations

Fine-tune scroll animation parameters:

```jsx
const config = useControls({
  scrollDuration: { value: 1000, min: 100, max: 5000, step: 100 },
  easing: {
    options: ['linear', 'easeIn', 'easeOut', 'easeInOut'],
    value: 'easeOut',
  },
  threshold: { value: 0.5, min: 0, max: 1 },
})
```

### Scroll-based Reveals

Control reveal animations:

```jsx
const config = useControls({
  revealThreshold: { value: 0.2, min: 0, max: 1 },
  stagger: { value: 100, min: 0, max: 500, step: 10 },
  fadeDistance: { value: 50, min: 0, max: 200 },
})
```

## Best Practices

1. **Use transient updates** for smooth scrolling without re-renders
2. **Debounce scroll events** for better performance
3. **Use onChange** for imperative updates to scroll elements
4. **Keep controls organized** in folders for complex setups

## Advanced: Scroll-triggered Controls

```jsx
import { useControls } from 'leva'
import { useInView } from 'react-intersection-observer'

function ScrollSection() {
  const { ref, inView } = useInView({ threshold: 0.5 })

  const config = useControls({
    animation: folder({
      enabled: true,
      duration: { value: 1, min: 0.1, max: 5 },
      delay: { value: 0, min: 0, max: 2 },
    }),
  })

  return (
    <div
      ref={ref}
      style={{
        opacity: inView && config.animation.enabled ? 1 : 0,
        transition: `opacity ${config.animation.duration}s ${config.animation.delay}s`,
      }}>
      Content revealed on scroll
    </div>
  )
}
```

## Next Steps

- Learn about [Transient Updates](/examples/transient/)
- Explore [Configuration](/guides/configuration/)
- See [UI Components](/examples/ui/)
