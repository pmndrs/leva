# Getting Started

## Install

```bash
npm install leva
```

## Basics

To use Leva, simply import `useControls` and use it anywhere in your app:

```jsx
import { useControls } from 'leva'

function MyComponent() {
  const { myValue } = useControls({ myValue: 10 })
  return myValue
}

function AnotherComponent() {
  const { anotherValue } = useControls({ anotherValue: "alive!!" })

  return <div>Hey, I'm {anotherValue}</div>
}

function UnmountedComponent() {
  const { barValue } = useControls({ barValue: false })

  return barValue ? <div>Hello!</div> : null
}

function MyApp() {
  
  return (
    <>
      <MyComponent />
      <AnotherComponent />
    </>
  )

}
```

Note that since `UnmountedComponent` is not mounted anywhere in our application, the control declared there will not be added to the GUI!

## Gotchas

- The order of the controls depends on hooks call order, in our case `myValue` will be first.
- @todo explain caching


### Other hooks / Components

- usePanel -> returns a new store
- useRootpanel -> uses the store in context
- LevaStoreProvider -> provides a store in context
- LevaPanel -> you can provide your own store generally from usePanel or consume the hook in context
