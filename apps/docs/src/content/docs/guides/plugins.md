---
title: Plugins
description: Extend Leva with custom input types
---

## What Are Plugins?

Plugins allow you to create custom input types for Leva. They're perfect for specialized controls that don't fit the standard input types, such as:

- Custom easing curves (bezier)
- Spring physics parameters
- Data visualization (plots, graphs)
- Date and time pickers
- Custom color spaces
- And more!

## Official Plugins

Leva provides several official plugins maintained by the core team:

### @leva-ui/plugin-bezier

Create and edit cubic bezier curves for animations:

```bash
npm install @leva-ui/plugin-bezier
```

```jsx
import { useControls } from 'leva'
import { bezier } from '@leva-ui/plugin-bezier'

function App() {
  const { curve } = useControls({
    curve: bezier(),
  })

  return (
    <div
      style={{
        animationTimingFunction: curve.cssEasing,
      }}
    />
  )
}
```

[Learn more →](/plugins/bezier/)

### @leva-ui/plugin-spring

Configure spring physics parameters visually:

```bash
npm install @leva-ui/plugin-spring
```

```jsx
import { useControls } from 'leva'
import { spring } from '@leva-ui/plugin-spring'

function App() {
  const { springConfig } = useControls({
    springConfig: spring(),
  })
}
```

[Learn more →](/plugins/spring/)

### @leva-ui/plugin-plot

Create interactive data plots and visualizations:

```bash
npm install @leva-ui/plugin-plot
```

```jsx
import { useControls } from 'leva'
import { plot } from '@leva-ui/plugin-plot'

function App() {
  const { data } = useControls({
    data: plot({
      expression: 'Math.sin(x)',
      graph: true,
    }),
  })
}
```

[Learn more →](/plugins/plot/)

### @leva-ui/plugin-dates

Date and time picker inputs:

```bash
npm install @leva-ui/plugin-dates
```

```jsx
import { useControls } from 'leva'
import { date } from '@leva-ui/plugin-dates'

function App() {
  const { selectedDate } = useControls({
    selectedDate: date(new Date()),
  })
}
```

[Learn more →](/plugins/dates/)

## Using Plugins

Using a plugin is as simple as importing it and using it in your controls:

```jsx
import { useControls } from 'leva'
import { bezier } from '@leva-ui/plugin-bezier'

function MyComponent() {
  const values = useControls({
    // Standard inputs
    speed: 1,
    color: '#ffffff',

    // Plugin input
    easing: bezier([0.25, 0.1, 0.25, 1.0]),
  })

  return <div>...</div>
}
```

Plugins work alongside standard inputs seamlessly.

## Creating Custom Plugins

Want to create your own plugin? Check out:

- [Creating Plugins Guide](/plugins/creating/) for the basics
- [Custom Plugin Example](/advanced/custom-plugin/) for a complete example

## Plugin Development Resources

The plugin API provides:

- **Component**: React component for the input UI
- **Normalize**: Normalize input values
- **Format**: Format values for display
- **Sanitize**: Validate and clean values
- **Settings**: Schema for plugin configuration

See the [Plugin Development Guide](/plugins/creating/) for detailed documentation.

## Finding Plugins

Community plugins can be found:

- On npm with the `leva-plugin` keyword
- In the [awesome-leva](https://github.com/pmndrs/leva#plugins) list
- On GitHub with the `leva-plugin` topic

## Next Steps

- Explore individual [plugin documentation](/plugins/bezier/)
- Learn to [create your own plugin](/plugins/creating/)
- Check out the [custom plugin example](/advanced/custom-plugin/)
