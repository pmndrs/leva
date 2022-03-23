# Getting Started

## Install

```bash
npm i leva
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
  const { anotherValue } = useControls({ anotherValue: 'alive!!' })

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

💡 The order of the controls depends on hooks call order, in our case `myValue` will be first.

## Input types

Leva will automagically use the best input type for your values, all the rules can be found in the [Inputs page](inputs.md)

## Conditionally showing fields

```jsx
useControls({
  check: false,
  myNumber: 4,
  color: { value: '#ffffffff', render: (get) => get('check') && get('myNumber') > 5 },
})
```

The `color` input will show in the pane only if `check` is `true` and `myNumber` is strictly greater than `5`.

## Folders

Using a folder structure can be as easy as setting the name you want as the first parameter of `useControls`.

```jsx
useControls('My folder', {
  showLighting: true,
  showStats: false,
})
```

### Nested folders

Say you want folders in your folders. For this we are going to need the `folder` function. Using this method the object key becomes the folder name

```jsx
import { folder, useControls } from 'leva'

const { showLighting, showStats } = useControls('My folder', {
  lighting: folder({
    showLighting: true,
  }),
  'Show stats': folder({
    showStats: false,
  }),
})
```

⚠️ One thing to note is that all inputs used here are returned on the same level. So the state will look like:

```
{
  showLighting: true,
  showStats: false
}
```

Notice how they are at the top level and the folder properties are ignored. This means that having properties with the same names in different folders will cause conflicts.
