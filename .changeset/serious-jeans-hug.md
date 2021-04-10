---
'leva': patch
---

Allow specifying the explicit input type via the `type` option. This is handy when you want to prevent your string value being casted to a color or number.

```tsx
import { LevaInputs, useControls } from 'leva'

useControls({
  color: {
    type: LevaInputs.STRING,
    value: '#f00',
  },
  number: {
    type: LevaInputs.STRING,
    value: '1',
  },
})
```
