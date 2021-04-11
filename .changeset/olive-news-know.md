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
