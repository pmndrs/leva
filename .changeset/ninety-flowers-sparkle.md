---
'leva': minor
---

BREAKING CHANGE: Replace `hideTitleBar` with `titleBar` option.

For hidng the title bar the usages of `<Leva hideTitleBar />` must be replaced with `<Leva titleBar={false} />`.

It is now possible to overwite the six dots rendered as the title by default by providing a object with a `title` property to the `titleBar` property.

```tsx
<Leva
  titleBar={{
    title: "Some Title"
  }}
/>
```
