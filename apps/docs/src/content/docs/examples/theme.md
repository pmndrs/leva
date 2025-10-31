---
title: Custom Theme
description: Fully customizing Leva's appearance
---

This example shows how to completely customize Leva's appearance using a custom theme with multiple themed panels.

## Full Theme Example

```jsx
import React from 'react'
import { useControls, useCreateStore, folder, Leva, LevaPanel } from 'leva'

export default function App() {
  const colorsStore = useCreateStore()
  const radiiStore = useCreateStore()
  const sizesStore = useCreateStore()

  // Define color palette
  const colors = useControls(
    {
      colors: folder({
        elevation1: '#292d39',
        elevation2: '#181C20',
        elevation3: '#373C4B',
        accent1: '#0066DC',
        accent2: '#007BFF',
        accent3: '#3C93FF',
        highlight1: '#535760',
        highlight2: '#8C92A4',
        highlight3: '#FEFEFE',
        vivid1: '#ffcc00',
      }),
    },
    { store: colorsStore }
  )

  // Define border radii
  const radii = useControls(
    {
      radii: folder({
        xs: '2px',
        sm: '3px',
        lg: '10px',
      }),
    },
    { store: radiiStore }
  )

  // Define sizing
  const sizes = useControls(
    {
      sizes: folder({
        rootWidth: '280px',
        controlWidth: '160px',
        rowHeight: '24px',
        folderHeight: '20px',
      }),
    },
    { store: sizesStore }
  )

  // Combine into theme object
  const theme = { colors, radii, sizes }

  return (
    <div style={{ backgroundColor: 'lightgray', minHeight: '100vh' }}>
      {/* Main panel with custom theme */}
      <Leva theme={theme} />

      {/* Theme editor panels */}
      <div
        style={{
          display: 'grid',
          width: 300,
          gap: 10,
          paddingBottom: 40,
          marginRight: 10,
          float: 'left',
          background: '#181C20',
        }}>
        <LevaPanel fill flat titleBar={false} store={colorsStore} />
        <LevaPanel fill flat titleBar={false} store={radiiStore} />
        <LevaPanel fill flat titleBar={false} store={sizesStore} />
      </div>

      <pre>{JSON.stringify(theme, null, '  ')}</pre>
    </div>
  )
}
```

## Theme Structure

### Colors

Control all color aspects:

```jsx
colors: {
  // Background layers
  elevation1: '#292d39',  // Main background
  elevation2: '#181C20',  // Darker background
  elevation3: '#373C4B',  // Lighter background

  // Interactive elements
  accent1: '#0066DC',     // Primary accent
  accent2: '#007BFF',     // Hover state
  accent3: '#3C93FF',     // Active state

  // Text and borders
  highlight1: '#535760',  // Subtle text
  highlight2: '#8C92A4',  // Normal text
  highlight3: '#FEFEFE',  // Emphasized text

  // Special
  vivid1: '#ffcc00',      // Warning/emphasis
}
```

### Border Radius

Control roundness:

```jsx
radii: {
  xs: '2px',  // Small elements
  sm: '3px',  // Medium elements
  lg: '10px', // Large elements (panel corners)
}
```

### Spacing

Control gaps and padding:

```jsx
space: {
  sm: '6px',      // Small spacing
  md: '10px',     // Medium spacing
  rowGap: '7px',  // Gap between rows
  colGap: '7px',  // Gap between columns
}
```

### Sizes

Control element dimensions:

```jsx
sizes: {
  rootWidth: '280px',          // Panel width
  controlWidth: '160px',       // Input width
  rowHeight: '24px',           // Row height
  folderHeight: '20px',        // Folder header
  scrubberWidth: '8px',        // Scrollbar width
  checkboxSize: '16px',        // Checkbox size
  joystickWidth: '100px',      // Joystick size
  colorPickerWidth: '160px',   // Color picker
  monitorHeight: '60px',       // Monitor height
  titleBarHeight: '39px',      // Title bar
}
```

### Typography

Control font properties:

```jsx
fontSizes: {
  root: '11px',  // Base font size
}

fontWeights: {
  label: 'normal',   // Input labels
  folder: 'normal',  // Folder headers
  button: 'normal',  // Buttons
}
```

### Border Widths

Control border thickness:

```jsx
borderWidths: {
  root: '0px',    // Panel border
  input: '1px',   // Input borders
  focus: '1px',   // Focus state
  hover: '1px',   // Hover state
  active: '1px',  // Active state
  folder: '1px',  // Folder borders
}
```

## Live Theme Editor

The example creates a live theme editor where you can adjust theme values in real-time:

1. Color values update immediately
2. Spacing and sizing adjust the layout
3. Typography changes affect all text
4. The main panel reflects all changes instantly

## Partial Themes

You don't need to specify everything:

```jsx
// Only customize colors
<Leva
  theme={{
    colors: {
      accent1: '#ff0000',
    },
  }}
/>
```

## Pre-built Themes

Create theme presets for different scenarios:

```jsx
const darkTheme = {
  colors: {
    elevation1: '#1a1a1a',
    elevation2: '#0a0a0a',
    accent1: '#ff6b6b',
  },
}

const lightTheme = {
  colors: {
    elevation1: '#ffffff',
    elevation2: '#f5f5f5',
    accent1: '#0066DC',
  },
}

function App() {
  const [theme, setTheme] = useState(darkTheme)

  return <Leva theme={theme} />
}
```

## Tips

- Start with colors, they have the biggest visual impact
- Keep elevation layers clearly distinct
- Use accent colors sparingly
- Test with both light and dark modes
- Consider accessibility (contrast ratios)

## Next Steps

- Learn about [Styling](/guides/styling/)
- See [Configuration](/guides/configuration/)
- Try other [Examples](/examples/minimal/)
