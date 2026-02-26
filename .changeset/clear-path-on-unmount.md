---
"leva": minor
---

Add `clearOnUnmount` option and `store.clearPath` to remove inputs from the store when their component unmounts.

- `store.clearPath(path)` — new method to imperatively remove a single input from the store.
- `InputOptions.clearOnUnmount` — per-input flag; when `true` the input is removed from the store on unmount.
- `LevaRootProps.clearOnUnmount` — panel-level flag; when `true` all inputs managed by that panel are cleared on unmount, overriding the per-input setting.
