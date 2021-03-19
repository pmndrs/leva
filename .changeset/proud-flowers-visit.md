---
'leva': patch
---

- Have `Select` accept functions as value or options. Fixes #165.
- Temporarily type the `set` function values with `any` when `useControls` is used with the function API. In the future, we should infer th value type from the sanitize function. 
