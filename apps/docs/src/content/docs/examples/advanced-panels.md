---
title: Advanced Panels
description: Working with multiple stores and LevaPanel components
---

This example demonstrates how to create multiple independent Leva panels using stores and the `LevaPanel` component.

## Example

```jsx
import React from 'react'
import { useControls, useStoreContext, useCreateStore, LevaPanel, LevaStoreProvider } from 'leva'

function MyComponent() {
  const store = useStoreContext()
  useControls({ point: [0, 0] }, { store })
  return null
}

export default function App() {
  // Create two independent stores
  const store1 = useCreateStore()
  const store2 = useCreateStore()

  // Add controls to each store
  useControls({ color: '#fff' }, { store: store1 })
  useControls({ boolean: true }, { store: store2 })

  return (
    <div
      style={{
        display: 'grid',
        width: 300,
        gridRowGap: 10,
        padding: 10,
        background: '#fff',
      }}>
      {/* Render separate panels */}
      <LevaPanel store={store1} fill flat titleBar={false} />
      <LevaPanel store={store2} fill flat titleBar={false} />

      {/* Use store context for nested components */}
      <LevaStoreProvider store={store1}>
        <MyComponent />
      </LevaStoreProvider>
    </div>
  )
}
```

## Key Concepts

### Creating Stores

Use `useCreateStore()` to create independent stores:

```jsx
const store1 = useCreateStore()
const store2 = useCreateStore()
```

Each store maintains its own set of controls and state.

### Associating Controls with Stores

Pass the `store` option to `useControls`:

```jsx
useControls({ color: '#fff' }, { store: store1 })
useControls({ boolean: true }, { store: store2 })
```

### Rendering Multiple Panels

Use `LevaPanel` to render each store separately:

```jsx
<LevaPanel store={store1} fill flat titleBar={false} />
<LevaPanel store={store2} fill flat titleBar={false} />
```

Each `LevaPanel` can have its own configuration (fill, flat, titleBar, etc.).

### Store Context

Use `LevaStoreProvider` to provide store context to child components:

```jsx
<LevaStoreProvider store={store1}>
  <MyComponent />
</LevaStoreProvider>
```

Inside `MyComponent`, use `useStoreContext()` to access the store:

```jsx
function MyComponent() {
  const store = useStoreContext()
  useControls({ point: [0, 0] }, { store })
  return null
}
```

## Use Cases

Multiple stores are useful for:

- **Separate Concerns**: Different panels for settings, debug, and rendering controls
- **Module Organization**: Each feature module has its own panel
- **Layout Control**: Position panels in different parts of the UI
- **Theme Variations**: Apply different themes to different panels

## Panel Configuration

`LevaPanel` supports all the same props as `Leva`:

```jsx
<LevaPanel
  store={store}
  theme={customTheme}
  fill // Fill container
  flat // Remove shadow/border-radius
  oneLineLabels // Alternative layout
  titleBar={false} // Hide header
  collapsed // Start collapsed
  hidden // Hide completely
/>
```

## Example: Themed Panels

```jsx
function App() {
  const lightStore = useCreateStore()
  const darkStore = useCreateStore()

  const lightTheme = {
    colors: { elevation1: '#ffffff', accent1: '#0066DC' },
  }

  const darkTheme = {
    colors: { elevation1: '#1a1a1a', accent1: '#ff6b6b' },
  }

  return (
    <>
      <LevaPanel store={lightStore} theme={lightTheme} />
      <LevaPanel store={darkStore} theme={darkTheme} />
    </>
  )
}
```

## Next Steps

- See [Custom Theme](/examples/theme/) for detailed theming
- Learn about [Configuration](/guides/configuration/)
- Explore [Styling](/guides/styling/)
