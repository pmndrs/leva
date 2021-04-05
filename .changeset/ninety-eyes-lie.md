---
'leva': patch
---

Add new value option `transient`. This allows opting out of the transient mode when having a `onChange` handler invoked.

```tsx
const data = useControls({
  color: {
    value: '#7c3d3d',
    onChange: (value) => {
      console.log(value)
    },
    transient: false,
  },
})

console.log(data) // { color: '#7c3d3d' }
```

```tsx
const data = useControls({
  color: {
    value: '#7c3d3d',
    onChange: (value) => {
      console.log(value)
    },
    transient: true,
  },
})

console.log(data) // {}
```

This is handy if you want to use the `onChange` handler for triggering a save on a remote server, while still triggering a re-render with the value.
