---
'leva': patch
---

Add `onEditStart` and `onEditEnd` callbacks for values.

```tsx
useControls({
  value: {
    value: 1,
    onEditStart: (value, path) => {},
    onEditEnd: (value, path) => {},
  },
})
```

Add `path` as a second parameter to `onChange` callback to mimic `onEditXXX` signature.
