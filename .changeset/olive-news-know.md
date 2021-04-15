---
'leva': patch
---

Add `context` argument to `onChange` handler.

The `context.initial` boolean parameter can be used to identify whether `onChange` is invoked initially.

```tsx
useControls({
  value: {
    value: 1,
    onChange: (value, { initial }) => {
      syncValue(value)
      if (!initial) {
        saveValueOnRemote(value)
      }
    },
  },
})
```

The `context.fromPanel` boolean parameter can be used to identify whether the `onChange` invocation is caused by the `Leva` component or via the `set` function return from the `useControl` hook.

```tsx
const [, set] = useControls(() => ({
  value: {
    value: 1,
    onChange: (value, { initial, fromPanel }) => {
      syncValue(value)
      if (!initial && !fromPanel) {
        // we don't wanna trigger a remote save in case the value has not been updated from the panel
        saveValueOnRemote(value)
      }
    },
  },
}))
```

The `context.get` parameter can be used for retrieving the up to date state of the store. This is handy if you need to do some invocations based on all the store values.

```tsx
const [, set] = useControls(() => ({
  value1: 1,
  value2: 2,
  value3: {
    value: 1,
    onChange: (value3, { get }) => {
      const { value1, value2 } = get()
      // calculate something based on value1 and value2
    },
  },
}))
```
