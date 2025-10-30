---
title: Quick Start
description: Get started with Leva in minutes
---

## Basic Usage

To use Leva, simply import `useControls` and call it anywhere in your app:

```jsx
import { useControls } from 'leva'

function MyComponent() {
  const { myValue } = useControls({ myValue: 10 })
  return <div>Value: {myValue}</div>
}
```

That's it! Leva will automatically create a GUI panel with a control for `myValue`.

## Multiple Controls

You can add multiple controls in a single call:

```jsx
function MyComponent() {
  const { name, age, isActive } = useControls({
    name: 'John',
    age: 25,
    isActive: true,
  })

  return (
    <div>
      <h1>{name}</h1>
      <p>Age: {age}</p>
      <p>Status: {isActive ? 'Active' : 'Inactive'}</p>
    </div>
  )
}
```

## Multiple Components

Controls from different components will appear in the same panel:

```jsx
function ComponentA() {
  const { valueA } = useControls({ valueA: 10 })
  return <div>{valueA}</div>
}

function ComponentB() {
  const { valueB } = useControls({ valueB: 'hello' })
  return <div>{valueB}</div>
}

function App() {
  return (
    <>
      <ComponentA />
      <ComponentB />
    </>
  )
}
```

The order of controls in the panel matches the order in which the hooks are called.

## Unmounted Components

:::note
Controls are only visible when their component is mounted. If a component unmounts, its controls are removed from the panel.
:::

## Type Recognition

Leva automatically selects the appropriate input type based on the value you provide:

- **Number**: Creates a number input with drag support
- **String**: Creates a text input
- **Boolean**: Creates a toggle
- **Color** (`#fff`, `rgb()`, `{r, g, b}`): Creates a color picker
- **Object** (`{x, y}`, `{x, y, z}`): Creates a vector input
- **Array**: Creates appropriate compound inputs

For more details, see the [Input Types](/guides/inputs/) guide.

## Next Steps

- Learn about all [Input Types](/guides/inputs/)
- Explore [Configuration Options](/guides/configuration/)
- Check out [Examples](/examples/minimal/)
