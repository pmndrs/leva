---
'leva': patch
---

Allow controlling the collapsed state of LevaPanel via object overload for the `controlled` property.

```tsx
const [collapsed, setCollapsed] = React.useState(false)

const leva = <Leva collapsed={{ collapsed, onChange: (collapsed) => setCollapsed(collapsed) }} />
```
