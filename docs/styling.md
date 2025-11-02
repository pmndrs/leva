# Customizing Style

Leva supports full theme customization through the `theme` prop on the `<Leva>` component. You can customize colors, spacing, typography, and more.

## Basic Theme Structure

A theme is an object with the following structure:

```jsx
const theme = {
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
    vivid1: '#ffcc00',
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
```

## Using a Theme

Apply your theme to the `<Leva>` component:

```jsx
import { Leva } from 'leva'

function MyApp() {
  return <Leva theme={myTheme} />
}
```

## Theme Properties

### Colors

Control the color scheme of the panel:

- `elevation1`: Main background color
- `elevation2`: Secondary background (folders, inputs)
- `elevation3`: Tertiary background (hover states)
- `accent1`: Primary accent color
- `accent2`: Secondary accent color
- `accent3`: Tertiary accent color
- `highlight1`: Muted text color
- `highlight2`: Regular text color
- `highlight3`: Bright text color
- `vivid1`: Vivid accent color

### Radii

Border radius values:

- `xs`: Extra small radius
- `sm`: Small radius
- `lg`: Large radius

### Space

Spacing values:

- `sm`: Small spacing
- `md`: Medium spacing
- `rowGap`: Vertical gap between rows
- `colGap`: Horizontal gap between columns

### Font Sizes

- `root`: Base font size for the entire panel

### Sizes

Control dimensions of various UI elements:

- `rootWidth`: Width of the panel
- `controlWidth`: Width of input controls
- `scrubberWidth`: Width of scrubber handles
- `scrubberHeight`: Height of scrubber handles
- `rowHeight`: Height of each control row
- `folderHeight`: Height of folder headers
- `checkboxSize`: Size of checkbox inputs
- `joystickWidth`: Width of joystick controls
- `joystickHeight`: Height of joystick controls
- `colorPickerWidth`: Width of color picker
- `colorPickerHeight`: Height of color picker
- `monitorHeight`: Height of monitor displays
- `titleBarHeight`: Height of title bar

### Border Widths

Border thickness for different states:

- `root`: Root container border
- `input`: Input field borders
- `focus`: Focus state border
- `hover`: Hover state border
- `active`: Active state border
- `folder`: Folder border

### Font Weights

Text weight for different elements:

- `label`: Control labels
- `folder`: Folder names
- `button`: Button text

## Example: Dark Theme

```jsx
const darkTheme = {
  colors: {
    elevation1: '#1a1a1a',
    elevation2: '#252525',
    elevation3: '#333333',
    accent1: '#0066DC',
    accent2: '#007BFF',
    accent3: '#3C93FF',
    highlight1: '#666666',
    highlight2: '#999999',
    highlight3: '#ffffff',
    vivid1: '#ffcc00',
  },
  radii: {
    xs: '2px',
    sm: '4px',
    lg: '8px',
  },
  space: {
    sm: '6px',
    md: '10px',
    rowGap: '7px',
    colGap: '7px',
  },
  fontSizes: {
    root: '12px',
  },
}

function App() {
  return <Leva theme={darkTheme} />
}
```

## Example: Light Theme

```jsx
const lightTheme = {
  colors: {
    elevation1: '#ffffff',
    elevation2: '#f5f5f5',
    elevation3: '#eeeeee',
    accent1: '#0066DC',
    accent2: '#007BFF',
    accent3: '#3C93FF',
    highlight1: '#666666',
    highlight2: '#333333',
    highlight3: '#000000',
    vivid1: '#ffcc00',
  },
  // ... other properties
}
```

## Dynamic Theme Editing

You can even create controls to edit your theme in real-time:

```jsx
import { useControls, useCreateStore, Leva, LevaPanel, folder } from 'leva'

function ThemeEditor() {
  const colorsStore = useCreateStore()
  const sizesStore = useCreateStore()

  const colors = useControls(
    {
      colors: folder({
        elevation1: '#292d39',
        elevation2: '#181C20',
        accent1: '#0066DC',
        // ... more colors
      }),
    },
    { store: colorsStore }
  )

  const sizes = useControls(
    {
      sizes: folder({
        rootWidth: '280px',
        controlWidth: '160px',
        // ... more sizes
      }),
    },
    { store: sizesStore }
  )

  const theme = { colors, sizes }

  return (
    <>
      <LevaPanel store={colorsStore} titleBar={{ title: 'Colors' }} />
      <LevaPanel store={sizesStore} titleBar={{ title: 'Sizes' }} />
      <Leva theme={theme} />
    </>
  )
}
```
