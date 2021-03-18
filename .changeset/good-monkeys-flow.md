---
'leva': minor
---

Add the `invertY` setting for the Vector2D joystick for inverting the y coordinate.

**BREAKING**: The default behavior has been changed. If you want the same behavior as in previous versions you will have to set the `joystick` option to `'invertY'`.

```tsx
const values = useControl({
  vector2d: {
    value: [0, 0],
    joystick: 'invertY',
  },
})
```
