---
title: Inputs
description:
nav: 0
---

# Input Types

`leva` will check the input settings and provide the best possible component.

### Number

A single numerical input.

```jsx
const { myNumber } = useControls({
  myNumber: 4,
})
```

- Increase / decrease numbers with arrow keys, with alt (±0.1) and shift (±10) modifiers support.
- Change the value by either dragging over the input label or the inner label.
- Automatically filters the input to be a numerical value
- Automatically calculates the number input step based on the initial value magnitude and significant digits.

### Range

A Number input with an additional range slider. It will be used when you provide a `min` and `max` value.

```jsx
const { myNumber } = useControls({
  myNumber: {
    value: 4,
    min: 0,
    max: 10,
    step: 1,
  },
})
```

All rules from Number type also apply.

### Color

A color picker. Color format is inferred by the object used:

```jsx
const colors = useControls({
  myFooColor: '#fff',
  myBarColor: { r: 200, b: 125, g: 106, a: 0.4 },
})
```

In the example, `myFooColor` will create an Hexadecimal field while `myBarColor` will expose return 4 values in separate r, g, b and a numerical fields.

### Boolean

A simple toggle.

```jsx
const { toggle } = useControls({ toggle: true })
```

### String

A text input field. Can be configured as a single-line input or multi-line textarea.

```jsx
const { myString } = useControls({
  myString: 'Hello World',
})
```

#### Multi-line strings

Enable multi-line editing with `rows: true` for default height, or specify a number:

```jsx
const { description } = useControls({
  description: {
    value: 'Multi-line\ntext\ncontent',
    rows: true, // Default height
  },
  notes: {
    value: 'Custom height',
    rows: 5, // 5 rows tall
  },
})
```

#### Non-editable strings

Make strings read-only while still allowing display:

```jsx
const { status } = useControls({
  status: {
    value: 'This text cannot be edited',
    editable: false,
  },
})
```

### Interval

An array containing two numerical values.
Will be used when `value` is an array of 2 numbers and `min` and `max` are specified.

```jsx
const { myInterval } = useControls({
  myInterval: {
    min: 0,
    max: 10,
    // initial value of 4, 5
    value: [4, 5],
  },
})
```

All rules from Number type also apply.

### Select

A dropdown select input with a specified list of elements. An optional default value can be provided.

```jsx
const { color } = useControls({
  color: {
    options: ['red', 'green', 'blue', 'yellow'],
    value: 'red',
  },
})
```

You can also use objects for labeled options:

```jsx
const { preset } = useControls({
  preset: {
    options: {
      low: 'Low Quality',
      medium: 'Medium Quality',
      high: 'High Quality',
    },
    value: 'medium',
  },
})
```

### Image

An image input that allows uploading or selecting an image file. Returns the image URL or `undefined`.

```jsx
const { myImage } = useControls({
  myImage: { image: undefined },
})
```

The returned value will be a data URL string when an image is selected, or `undefined` when no image is set.

### Vector2

Compound input of two numerical values without `min` and `max` bounds.
Will be used when value is an object with `x` and `y` properties or an array of
two numbers.

```jsx
const { position } = useControls({
  position: { x: 0, y: 0 },
  boxSize: [10, 20],
})
```

The joystick can be hidden with `joystick: false` and inverted with `"invertY"`.

```jsx
const { position } = useControls({
  position: {
    value: { x: 0, y: 0 },
    joystick: 'invertY',
  },
  boxSize: {
    value: [10, 20],
    joystick: false,
  },
})
```

The `step` setting can be used to change joystick's resistance.

```jsx
const { position } = useControls({
  position: {
    value: { x: 0, y: 0 },
    step: 0.1,
  },
})
```

You can also use your keyboard to control the step.
Pressing the shift key while dragging increases the step. Pressing alt decreases the step.

You can set options separately for each coordinate by nesting them under coordinate's key.

```jsx
useControls({
  vec2: {
    value: {
      x: 0,
      y: 0,
    },
    x: {
      step: 0.1,
    },
    y: {
      step: 1,
    },
  },
})
```

### Vector3

Very similar to Vector2 but now with the z axis.

```jsx
useControls({
  vec3: {
    x: 0,
    y: 2,
    z: 1.5,
  },
  anotherVec3: [3, 1, 1],
})
```

One difference with Vector2 to keep in mind is that you don't have the `joystick` option.

### Lock

Both Vector2 and Vector3 support a `lock` option that synchronizes all coordinates when one is changed:

```jsx
const { position } = useControls({
  position: {
    value: [1, 1, 1],
    lock: true, // Changing x will also update y and z
  },
})
```

## Input Options

All inputs support common options:

### Label

Customize the display label:

```jsx
const { color } = useControls({
  color: {
    value: '#f00',
    label: 'Background Color',
  },
})
```

You can also use React elements as labels:

```jsx
import { Half2Icon } from '@radix-ui/react-icons'

const { color } = useControls({
  color: {
    value: '#f00',
    label: <Half2Icon />,
  },
})
```

### Hint

Add a tooltip or help text:

```jsx
const { position } = useControls({
  position: {
    value: [0, 0, 0],
    hint: 'Position of the object relative to the screen',
  },
})
```

### Render

Conditionally show inputs based on other values:

```jsx
const { showAdvanced, advancedValue } = useControls({
  showAdvanced: false,
  advancedValue: {
    value: 0,
    render: (get) => get('showAdvanced'),
  },
})
```

### Order

Control the display order of inputs:

```jsx
const values = useControls({
  last: { value: 0, order: 1 },
  middle: { value: 0, order: -1 },
  first: { value: 0, order: -2 },
})
```

Lower order values appear first.

### Optional

Mark inputs as optional (they can be hidden/shown via UI):

```jsx
const { color } = useControls({
  color: {
    value: '#f00',
    optional: true,
  },
})
```

### Disabled

Disable inputs (they won't be editable):

```jsx
const { readonly } = useControls({
  readonly: {
    value: 'Cannot edit',
    disabled: true,
    hint: 'This input is disabled',
  },
})
```

### onChange

Execute a callback when the value changes (see [Controlled Inputs](advanced/controlled-inputs.md)):

```jsx
const values = useControls({
  color: {
    value: '#f00',
    onChange: (value) => {
      console.log('Color changed:', value)
    },
  },
})
```

### onEditStart / onEditEnd

Callbacks for when editing begins/ends:

```jsx
const values = useControls({
  position: {
    value: { x: 0, y: 0 },
    onEditStart: (value, path) => {
      console.log('Started editing', path)
    },
    onEditEnd: (value, path) => {
      console.log('Finished editing', path)
    },
  },
})
```

### Enforcing Input Type

Force a specific input type even if Leva would infer differently:

```jsx
import { LevaInputs } from 'leva'

const { value } = useControls({
  value: {
    type: LevaInputs.STRING,
    value: '#f00', // Would normally be a color, but forced to string
  },
})
```
