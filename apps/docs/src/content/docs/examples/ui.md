---
title: UI Components
description: Using Leva as a UI component library
---

Leva can be used not just as a debugging tool, but as a full-featured UI component library for building control panels and interfaces.

## Overview

Beyond development tools, Leva's components can serve as:

- Settings panels for user-facing applications
- Control interfaces for creative tools
- Configuration UIs for games and simulations
- Admin panels and dashboards

## Embedded UI Example

```jsx
import { useControls, button, buttonGroup, monitor } from 'leva'
import { useRef, useEffect } from 'react'

export default function App() {
  const statsRef = useRef({ fps: 60, drawCalls: 0 })

  const settings = useControls({
    // Settings section
    quality: {
      options: ['Low', 'Medium', 'High', 'Ultra'],
      value: 'High',
    },
    resolution: {
      value: [1920, 1080],
      x: { min: 640, max: 3840 },
      y: { min: 480, max: 2160 },
    },

    // Actions
    apply: button(() => applySettings()),
    reset: button(() => resetSettings()),

    // Button group
    preset: buttonGroup({
      Balanced: () => setPreset('balanced'),
      Performance: () => setPreset('performance'),
      Quality: () => setPreset('quality'),
    }),

    // Monitoring
    stats: monitor(statsRef, {
      graph: true,
      interval: 100,
    }),
  })

  return <YourApp settings={settings} />
}
```

## Special UI Components

### Buttons

Single action buttons:

```jsx
useControls({
  save: button(() => saveData()),
  load: button(() => loadData()),
  export: button(() => exportData()),
})
```

### Button Groups

Related actions in a group:

```jsx
import { buttonGroup } from 'leva'

useControls({
  actions: buttonGroup({
    Start: () => start(),
    Pause: () => pause(),
    Stop: () => stop(),
    Reset: () => reset(),
  }),
})
```

### Monitors

Display live values:

```jsx
import { monitor } from 'leva'

const metricsRef = useRef({ value: 0 })

// Update metrics elsewhere
useEffect(() => {
  const interval = setInterval(() => {
    metricsRef.current.value = Math.random() * 100
  }, 100)
  return () => clearInterval(interval)
}, [])

useControls({
  metrics: monitor(metricsRef, {
    graph: true, // Show graph
    interval: 100, // Update interval
  }),
})
```

## Folder Organization

Create organized, collapsible sections:

```jsx
import { folder, useControls } from 'leva'

useControls({
  graphics: folder({
    quality: { options: ['Low', 'High'] },
    shadows: true,
    antialiasing: true,
  }),

  audio: folder({
    masterVolume: { value: 0.8, min: 0, max: 1 },
    music: { value: 0.6, min: 0, max: 1 },
    sfx: { value: 0.8, min: 0, max: 1 },
  }),

  controls: folder({
    sensitivity: { value: 1, min: 0.1, max: 5 },
    invertY: false,
  }),
})
```

## Custom Styling for Applications

Apply your brand's theme:

```jsx
import { Leva } from 'leva'

const appTheme = {
  colors: {
    elevation1: '#ffffff',
    elevation2: '#f5f5f5',
    elevation3: '#e0e0e0',
    accent1: '#6200ee',
    accent2: '#7c4dff',
    accent3: '#9575cd',
    highlight1: '#666666',
    highlight2: '#333333',
    highlight3: '#000000',
  },
  sizes: {
    rootWidth: '320px',
  },
}

export default function App() {
  return (
    <>
      <Leva theme={appTheme} fill flat />
      <YourApp />
    </>
  )
}
```

## Production UI

Remove development features for production:

```jsx
<Leva
  titleBar={false} // Hide Leva branding
  flat // Clean appearance
  fill // Match container
/>
```

## Responsive Layout

Adapt to different screen sizes:

```jsx
import { Leva, useControls } from 'leva'
import { useState, useEffect } from 'react'

function App() {
  const [isMobile, setIsMobile] = useState(false)

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768)
    }
    checkMobile()
    window.addEventListener('resize', checkMobile)
    return () => window.removeEventListener('resize', checkMobile)
  }, [])

  const settings = useControls({
    // Your controls
  })

  return (
    <div
      style={{
        display: 'flex',
        flexDirection: isMobile ? 'column' : 'row',
      }}>
      <Leva collapsed={isMobile} fill={isMobile} />
      <Content settings={settings} />
    </div>
  )
}
```

## Integration Patterns

### Settings Modal

```jsx
import { LevaPanel, useCreateStore } from 'leva'

function SettingsModal({ isOpen, onClose }) {
  const store = useCreateStore()

  if (!isOpen) return null

  return (
    <div className="modal">
      <LevaPanel store={store} fill titleBar={false} />
      <button onClick={onClose}>Close</button>
    </div>
  )
}
```

### Sidebar Controls

```jsx
function App() {
  return (
    <div style={{ display: 'flex' }}>
      <aside style={{ width: 300 }}>
        <Leva fill flat titleBar={false} />
      </aside>
      <main style={{ flex: 1 }}>
        <Content />
      </main>
    </div>
  )
}
```

## Next Steps

- Learn about [Custom Themes](/examples/theme/)
- Explore [Configuration](/guides/configuration/)
- See [Styling Guide](/guides/styling/)
