---
title: Configuration
description:
nav: 0
---

## Configuration

You can configure Leva by using the `<Leva>` component anywhere in your App:

```jsx
import { Leva } from 'leva'

export default function MyApp() {
  return (
    <>
      <Leva
        theme={myTheme} // you can pass a custom theme (see the styling section)
        fill // default = false, true makes the pane fill the parent dom node it's rendered in
        flat // default = false, true removes border radius and shadow
        oneLineLabels // default = false, alternative layout for labels, with labels and fields on separate rows
        hideTitleBar // default = false, hides the GUI header
        collapsed // default = false, when true the GUI is collapsed
        hidden // default = false, when true the GUI is hidden
        neverHide // default = false, when true the GUI stays visible even when no controls are mounted
        hideCopyButton // default = false, hides the copy button in the title bar
        titleBar={{
          // Configure title bar options
          title: 'My Controls', // Custom title
          drag: true, // Enable dragging
          filter: true, // Enable filter/search
          position: { x: 0, y: 0 }, // Initial position (when drag is enabled)
          onDrag: (position) => {}, // Callback when dragged
        }}
      />
    </>
  )
}
```

### Panel Props

- `theme`: Custom theme object (see [Styling](styling.md))
- `fill`: Makes the pane fill its parent container
- `flat`: Removes border radius and shadow
- `oneLineLabels`: Alternative layout with labels and fields on separate rows
- `hideTitleBar`: Hides the entire title bar
- `collapsed`: Initial collapsed state (can be controlled)
- `hidden`: Hides the GUI completely
- `neverHide`: Keeps GUI visible even when no controls are mounted
- `hideCopyButton`: Hides the copy button in the title bar
- `titleBar`: Object with title bar configuration:
  - `title`: Custom title string
  - `drag`: Enable/disable dragging
  - `filter`: Enable/disable filter/search
  - `position`: Initial position `{ x, y }` (when drag is enabled)
  - `onDrag`: Callback `(position) => void` when panel is dragged

### Using Multiple Panels

You can create multiple panels using `LevaPanel` with custom stores:

```jsx
import { LevaPanel, useCreateStore, useControls } from 'leva'

function MyApp() {
  const store1 = useCreateStore()
  const store2 = useCreateStore()

  const values1 = useControls({ x: 0 }, { store: store1 })
  const values2 = useControls({ y: 0 }, { store: store2 })

  return (
    <>
      <LevaPanel store={store1} titleBar={{ title: 'Panel 1' }} />
      <LevaPanel store={store2} titleBar={{ title: 'Panel 2' }} />
    </>
  )
}
```

### Disabling the GUI

Each instance of the `useControls` hook will render the panel. If you want to completely disable the GUI based on preferences, you need to explicitly set `hidden` to false.

```jsx
import { Leva } from 'leva'

function MyComponent() {
  const { myValue } = useControls({ myValue: 10 }) // Won't be visible because the panel will not render.

  return myValue
}

export default function MyApp() {
  return (
    <>
      <Leva hidden={true} />
    </>
  )
}
```

### Controlled Collapsed State

You can control the collapsed state from outside:

```jsx
function MyApp() {
  const [collapsed, setCollapsed] = useState(true)

  return (
    <>
      <button onClick={() => setCollapsed(!collapsed)}>{collapsed ? 'Expand' : 'Collapse'}</button>
      <Leva
        collapsed={{
          collapsed,
          onChange: (c) => setCollapsed(c),
        }}
      />
    </>
  )
}
```
