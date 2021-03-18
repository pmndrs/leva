---
"leva": patch
---

Feat: `onChange` callback for transient updates

```js
useControls({ color: { value: 'red', onChange: (v) => console.log(v) } })
