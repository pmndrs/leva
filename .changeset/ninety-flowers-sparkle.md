---
'leva': patch
---

BREAKING CHANGE: Replace `hideTitleBar` with `titleBar` option.

For hiding the title bar the usages of `<Leva hideTitleBar />` must be replaced with `<Leva titleBar={false} />`.

It is now possible to overwrite the six dots rendered as the title by default by providing a `title` option to the `titleBar` property.

```tsx
<Leva
  titleBar={{
    title: 'Some Title',
  }}
/>
```

Its is now possible to disable dragging of the panel via the `drag` option to the `titleBar` property.

```tsx
<Leva
  titleBar={{
    drag: false,
  }}
/>
```

It is now possible to enable or disable filtering of the panel values via the `filter` option on the `titleBar` property.

```tsx
<Leva
  titleBar={{
    filter: true,
  }}
/>
```
