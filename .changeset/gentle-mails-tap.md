---
'leva': patch
---

Add `onEditStart` and `onEditEnd` callbacks for values.

```tsx
useControls({
  value: {
    value: 1,
    onEditStart: () => {},
    onEditEnd: () => {},
  },
})
```
