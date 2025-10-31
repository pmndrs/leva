---
title: Input Types
description: All available input types in Leva
---

Leva automatically selects the best input component based on the value and options you provide.

## Number

A single numerical input with keyboard and drag support.

```jsx
const { myNumber } = useControls({
  myNumber: 4,
})
```

**Features:**

- Increase/decrease with arrow keys
- Hold `Alt` for ±0.1 steps
- Hold `Shift` for ±10 steps
- Drag the label to change value
- Auto-calculated step size based on initial value

## Range

A number input with a slider, activated when you provide `min` and `max`:

```jsx
const { myNumber } = useControls({
  myNumber: {
    value: 4,
    min: 0,
    max: 10,
    step: 1, // optional
  },
})
```

All number features apply, plus a visual slider for easier value selection.

## String

A text input field:

```jsx
const { name } = useControls({
  name: 'Hello World',
})
```

## Boolean

A toggle switch:

```jsx
const { isActive } = useControls({
  isActive: true,
})
```

## Color

A color picker with multiple format support:

### Hex Format

```jsx
const { color } = useControls({
  myColor: '#ff0000',
})
```

### RGB Object Format

```jsx
const { color } = useControls({
  myColor: { r: 200, g: 125, b: 106, a: 0.4 },
})
```

The object format exposes separate controls for R, G, B, and A values.

## Select

A dropdown menu with predefined options:

```jsx
const { preset } = useControls({
  preset: {
    options: ['red', 'green', 'blue', 'yellow'],
    value: 'red', // optional default
  },
})
```

## Interval

Two-ended range slider for selecting a range:

```jsx
const { range } = useControls({
  range: {
    min: 0,
    max: 10,
    value: [4, 5], // [start, end]
  },
})
```

All number keyboard shortcuts apply to both handles.

## Vector2

A 2D coordinate input with optional joystick:

### Object Syntax

```jsx
const { position } = useControls({
  position: { x: 0, y: 0 },
})
```

### Array Syntax

```jsx
const { boxSize } = useControls({
  boxSize: [10, 20],
})
```

### Joystick Options

```jsx
const { position } = useControls({
  position: {
    value: { x: 0, y: 0 },
    joystick: 'invertY', // or false to hide, or true
    step: 0.1, // joystick sensitivity
  },
})
```

### Per-Coordinate Options

```jsx
const { vec2 } = useControls({
  vec2: {
    value: { x: 0, y: 0 },
    x: { step: 0.1 },
    y: { step: 1 },
  },
})
```

## Vector3

A 3D coordinate input (no joystick):

### Object Syntax

```jsx
const { vec3 } = useControls({
  vec3: { x: 0, y: 2, z: 1.5 },
})
```

### Array Syntax

```jsx
const { rotation } = useControls({
  rotation: [Math.PI / 2, 0, 0],
})
```

### Per-Coordinate Options

```jsx
const { vec3 } = useControls({
  vec3: {
    value: { x: 0, y: 0, z: 0 },
    y: { min: 0 },
    z: { step: 0.01 },
  },
})
```

## Image

An image upload input:

```jsx
const { texture } = useControls({
  texture: { image: undefined },
})
```

The control allows users to drag and drop or select an image file.

## Advanced Options

### Labels and Hints

Provide custom labels and helpful hints:

```jsx
const { color } = useControls({
  color: {
    value: '#f00',
    label: 'Primary Color',
    hint: 'The main color used throughout the app',
  },
})
```

### Optional Values

Make a control optional with a toggle:

```jsx
const { maxWidth } = useControls({
  maxWidth: {
    value: 100,
    min: 0,
    max: 200,
    optional: true, // adds a checkbox to enable/disable
  },
})
```

### Conditional Rendering

Show/hide controls based on other values:

```jsx
useControls({
  showAdvanced: false,
  advancedOption: {
    value: 10,
    render: (get) => get('showAdvanced'), // only show if showAdvanced is true
  },
})
```

## Next Steps

- Learn about [Folders and Organization](/guides/configuration/)
- Explore [Custom Styling](/guides/styling/)
- Check out [Plugin System](/guides/plugins/)
