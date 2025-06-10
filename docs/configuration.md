## Configuration

You can configure Leva by using the `<Leva>` component anywhere in your App:

```jsx
import { Leva } from 'leva'

export default function MyApp() {
  return (
    <>
      <Leva
        theme={myTheme} // you can pass a custom theme (see the styling section)
        fill // default = false,  true makes the pane fill the parent dom node it's rendered in
        flat // default = false,  true removes border radius and shadow
        oneLineLabels // default = false, alternative layout for labels, with labels and fields on separate rows
        hideTitleBar // default = false, hides the GUI header
        collapsed // default = false, when true the GUI is collpased
        hidden // default = false, when true the GUI is hidden
      />
    </>
  )
}
```

- TODO // Add default config for LevaPanel as well

### Disabling the GUI

Each instance of the `useControls` hook will render the panel. If you want to completely disable the GUI based on preferences, you need to explicitly set `hidden` to true.

```jsx
import { Leva } from 'leva'

function MyComponent() {
  const { myValue } = useControls({ myValue: 10 }) // Won't be visible because the panel will not render.

  return myValue
}

export default function MyApp() {
  return (
    <>
      <Leva {...config} hidden={true} />
    </>
  )
}
```
