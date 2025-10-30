---
title: Styling
description: Customize the appearance of Leva
---

## Custom Themes

Leva can be fully themed to match your application's design. Pass a theme object to the `Leva` component:

```jsx
import { Leva } from 'leva'

const myTheme = {
  colors: {
    elevation1: '#292d39',
    elevation2: '#181C20',
    elevation3: '#373C4B',
    accent1: '#0066DC',
    accent2: '#007BFF',
    accent3: '#3C93FF',
    highlight1: '#535760',
    highlight2: '#8C92A4',
    highlight3: '#FEFEFE',
  },
  radii: {
    xs: '2px',
    sm: '3px',
    lg: '10px',
  },
  space: {
    sm: '6px',
    md: '10px',
    rowGap: '7px',
    colGap: '7px',
  },
  fontSizes: {
    root: '11px',
  },
  sizes: {
    rootWidth: '280px',
    controlWidth: '160px',
    scrubberWidth: '8px',
    scrubberHeight: '16px',
    rowHeight: '24px',
    folderHeight: '20px',
    checkboxSize: '16px',
    joystickWidth: '100px',
    joystickHeight: '100px',
    colorPickerWidth: '160px',
    colorPickerHeight: '100px',
    monitorHeight: '60px',
    titleBarHeight: '39px',
  },
  borderWidths: {
    root: '0px',
    input: '1px',
    focus: '1px',
    hover: '1px',
    active: '1px',
    folder: '1px',
  },
  fontWeights: {
    label: 'normal',
    folder: 'normal',
    button: 'normal',
  },
}

export default function App() {
  return (
    <>
      <Leva theme={myTheme} />
      <YourApp />
    </>
  )
}
```

## Theme Properties

### Colors

The most common customization is colors. Leva uses a three-level elevation system:

- **elevation1**: Primary background
- **elevation2**: Secondary background (darker)
- **elevation3**: Tertiary background (lighter)
- **accent1-3**: Accent colors for interactive elements
- **highlight1-3**: Text and border colors
- **vivid1**: Special emphasis color

```jsx
const darkTheme = {
  colors: {
    elevation1: '#1a1a1a',
    elevation2: '#0a0a0a',
    elevation3: '#2a2a2a',
    accent1: '#ff6b6b',
    accent2: '#ff8787',
    accent3: '#ffa5a5',
    highlight1: '#666666',
    highlight2: '#999999',
    highlight3: '#ffffff',
  },
}
```

### Sizes

Control the dimensions of various UI elements:

```jsx
const compactTheme = {
  sizes: {
    rootWidth: '240px', // Overall panel width
    controlWidth: '120px', // Input control width
    rowHeight: '20px', // Row height
    folderHeight: '18px', // Folder header height
  },
}
```

### Spacing

Adjust the spacing between elements:

```jsx
const spaciousTheme = {
  space: {
    sm: '8px',
    md: '12px',
    rowGap: '8px',
    colGap: '8px',
  },
}
```

### Border Radius

Control the roundness of corners:

```jsx
const roundTheme = {
  radii: {
    xs: '4px',
    sm: '6px',
    lg: '12px',
  },
}
```

### Typography

Customize fonts and sizes:

```jsx
const customFonts = {
  fontSizes: {
    root: '12px',
  },
  fontWeights: {
    label: 'bold',
    folder: 'bold',
    button: 'normal',
  },
}
```

## Partial Themes

You don't need to provide all theme properties. Leva will merge your custom theme with the defaults:

```jsx
// Only customize colors
<Leva
  theme={{
    colors: {
      accent1: '#ff0000',
      accent2: '#ff3333',
    },
  }}
/>
```

## Dynamic Themes

You can change themes dynamically by managing state:

```jsx
function App() {
  const [isDark, setIsDark] = useState(true)

  const theme = isDark ? darkTheme : lightTheme

  return (
    <>
      <button onClick={() => setIsDark(!isDark)}>Toggle Theme</button>
      <Leva theme={theme} />
    </>
  )
}
```

## Panel Styling Props

In addition to themes, you can use props for quick styling adjustments:

```jsx
<Leva
  fill // Fill parent container
  flat // Remove shadows and border radius
  oneLineLabels // Alternative layout
  titleBar={false} // Hide title bar
/>
```

## CSS Custom Properties

Leva exposes CSS custom properties that you can override with global CSS:

```css
:root {
  --leva-colors-elevation1: #1a1a1a;
  --leva-colors-accent1: #ff0000;
  --leva-sizes-rootWidth: 300px;
}
```

## Examples

Check out the [Theme Example](/examples/theme/) to see a fully customized Leva panel in action.

## Next Steps

- See [Theme Example](/examples/theme/) for a complete implementation
- Learn about [Configuration](/guides/configuration/)
- Explore [Plugins](/guides/plugins/)
