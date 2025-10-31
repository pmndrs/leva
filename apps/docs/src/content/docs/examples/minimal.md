---
title: Minimal Setup
description: A minimal example of Leva in action
---

This is the simplest possible Leva setup, demonstrating the core features with minimal code.

## Example

```jsx
import React from 'react'
import { useControls, Leva } from 'leva'
import { Half2Icon } from '@radix-ui/react-icons'

export default function App() {
  const data = useControls({
    number: 10,
    minmax: { value: 12.5, min: 5.5, max: 30.5, optional: true },
    printSize: { value: 100, min: 80, max: 140, step: 10 },
    color: {
      value: '#f00',
      hint: 'Hey, we support icons and hinting values and long text will wrap!',
      label: <Half2Icon />,
    },
  })

  return (
    <>
      <Leva titleBar={false} />
      <pre>{JSON.stringify(data, null, '  ')}</pre>
    </>
  )
}
```

## Key Features Demonstrated

### Simple Number Input

```jsx
number: 10
```

Creates a basic number input with automatic step calculation.

### Range with Optional Toggle

```jsx
minmax: { value: 12.5, min: 5.5, max: 30.5, optional: true }
```

A range slider with an optional toggle to enable/disable the value.

### Stepped Range

```jsx
printSize: { value: 100, min: 80, max: 140, step: 10 }
```

Range input that snaps to increments of 10.

### Color with Hints and Icons

```jsx
color: {
  value: '#f00',
  hint: 'Hey, we support icons and hinting values and long text will wrap!',
  label: <Half2Icon />,
}
```

Demonstrates:

- Custom hints (tooltips)
- React component labels (icons)
- Automatic text wrapping

## Configuration

The example uses `titleBar={false}` to hide the Leva header:

```jsx
<Leva titleBar={false} />
```

## Output

The `data` object contains all the control values:

```json
{
  "number": 10,
  "minmax": 12.5,
  "printSize": 100,
  "color": "#f00"
}
```

## Try It Yourself

1. Change the number by dragging the label or using arrow keys
2. Toggle the `minmax` checkbox to enable/disable the value
3. Drag the `printSize` slider and notice it snaps to steps of 10
4. Click the color to open the color picker

## Next Steps

- Explore [Advanced Panels](/examples/advanced-panels/) for multiple stores
- Learn about [Custom Themes](/examples/theme/)
- See [Transient Updates](/examples/transient/) for performance optimization
