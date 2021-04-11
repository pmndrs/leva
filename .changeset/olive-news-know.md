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
