---
title: Configuration
description: Configure Leva panels and controls
---

## The Leva Component

You can configure Leva globally using the `<Leva>` component anywhere in your app:

```jsx
import { Leva } from 'leva'

export default function MyApp() {
  return (
    <>
      <Leva
        theme={myTheme} // Custom theme (see Styling)
        fill // Fill parent container
        flat // Remove border radius and shadow
        oneLineLabels // Alternative label layout
        titleBar={false} // Hide the header
        collapsed // Start collapsed
        hidden // Hide the panel
      />
      <YourApp />
    </>
  )
}
```

## Configuration Options

### `theme`

Pass a custom theme object to style the panel. See [Styling](/guides/styling/) for details.

### `fill`

**Default:** `false`

Makes the panel fill its parent container instead of having a fixed width.

### `flat`

**Default:** `false`

Removes border radius and box shadow for a flat appearance.

### `oneLineLabels`

**Default:** `false`

Changes the layout to show labels and inputs on separate rows.

### `titleBar` / `hideTitleBar`

**Default:** `true`

Shows or hides the header bar with the Leva title.

### `collapsed`

**Default:** `false`

Starts the panel in a collapsed state.

### `hidden`

**Default:** `false`

Hides the panel completely. Useful for production builds.

## Folders

Organize your controls into collapsible folders:

### Simple Folder

Use the first parameter of `useControls` to create a top-level folder:

```jsx
useControls('Settings', {
  showLighting: true,
  showStats: false,
})
```

### Nested Folders

Use the `folder` helper for nested organization:

```jsx
import { folder, useControls } from 'leva'

const { showLighting, showStats } = useControls('My folder', {
  lighting: folder({
    showLighting: true,
    ambientIntensity: 0.5,
  }),
  debug: folder({
    showStats: false,
    showGrid: true,
  }),
})
```

:::note
All inputs are returned at the same level regardless of folder nesting. Having duplicate keys in different folders will cause conflicts.
:::

### Folder Options

Control folder behavior with additional options:

```jsx
useControls({
  advanced: folder(
    {
      detail: 5,
      quality: 'high',
    },
    {
      collapsed: true, // Start collapsed
      render: (get) => get('showAdvanced'), // Conditional rendering
    }
  ),
})
```

## Conditional Rendering

Show or hide inputs based on other values:

```jsx
useControls({
  enabled: false,
  intensity: {
    value: 1.0,
    render: (get) => get('enabled'), // Only show if enabled is true
  },
  color: {
    value: '#ffffff',
    render: (get) => get('enabled') && get('intensity') > 0.5,
  },
})
```

The `render` function receives a `get` function to access other control values.

## Multiple Stores

Create separate panels with independent stores:

```jsx
import { useCreateStore, useControls, LevaPanel } from 'leva'

function App() {
  const store1 = useCreateStore()
  const store2 = useCreateStore()

  const settings = useControls({ setting1: 10 }, { store: store1 })

  const colors = useControls({ color1: '#fff' }, { store: store2 })

  return (
    <>
      <LevaPanel store={store1} />
      <LevaPanel store={store2} />
    </>
  )
}
```

## Input Options

### Common Options

Available for all input types:

```jsx
useControls({
  value: {
    value: 10, // The initial value
    label: 'My Value', // Custom label
    hint: 'Helpful tip', // Tooltip text
    disabled: false, // Disable the input
    optional: true, // Add enable/disable toggle
    order: 1, // Control display order
  },
})
```

### Transient Updates

For performance-sensitive values, use `transient` to prevent re-renders during interaction:

```jsx
const { rotation } = useControls({
  rotation: {
    value: 0,
    transient: true, // Only triggers update on release
  },
})
```

Use with the `onEditEnd` or `onEditStart` callbacks:

```jsx
const [rotation, set] = useControls(() => ({
  rotation: {
    value: 0,
    transient: true,
    onEditEnd: (value) => console.log('Final value:', value),
  },
}))
```

## Next Steps

- Learn about [Styling](/guides/styling/) to customize appearance
- Explore [Examples](/examples/minimal/) to see real configurations
- Check out [Plugins](/guides/plugins/) for custom input types
