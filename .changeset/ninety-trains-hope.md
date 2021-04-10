---
'leva': patch
---

Improve `buttonGroup` API.

The label is now completely hidden when specifying key that only includes spaces. Previously the label was still rendered, but without text, this caused ugly spacing when using the `oneLineLabels` option on the `Leva` component.

```ts
const [values, set] = useControls(() => ({
  Size: 1,
  ' ': buttonGroup({
    '0.25x': () => set({ Size: 0.25 }),
    '0.5x': () => set({ Size: 0.5 }),
    '1x': () => set({ Size: 1 }),
    '2x': () => set({ Size: 2 }),
    '3x': () => set({ Size: 3 }),
  }),
}))
```

It is now possible to set the `label` via the `buttonGroup` arguments by using the alternative API:

```ts
const [values, set] = useControls(() => ({
  Width: 1,
  WidthPresets: buttonGroup({
    label: null,
    opts: {
      '0.25x': () => set({ Size: 0.25 }),
      '0.5x': () => set({ Size: 0.5 }),
      '1x': () => set({ Size: 1 }),
      '2x': () => set({ Size: 2 }),
      '3x': () => set({ Size: 3 }),
    },
  }),
  Height: 1,
  HeightPresets: buttonGroup({
    label: null,
    opts: {
      '0.25x': () => set({ Size: 0.25 }),
      '0.5x': () => set({ Size: 0.5 }),
      '1x': () => set({ Size: 1 }),
      '2x': () => set({ Size: 2 }),
      '3x': () => set({ Size: 3 }),
    },
  }),
}))
```

This helps avoiding a bunch of ` ` labels (where each new one contains one more space).
