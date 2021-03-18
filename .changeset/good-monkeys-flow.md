---
'leva': minor
---

Add the `invertY` setting for the Vector2D joystick for inverting the y coordinate.

```tsx
const values = useControl({
  vector2d: {
    value: [0, 0],
    invertY: true,
  },
})
```
