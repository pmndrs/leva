---
"leva": minor
---

Add `clearOnUnmount` option to remove inputs from the store when their component unmounts.

- `InputOptions.clearOnUnmount` — per-input flag; when `true` the input is removed from the store on unmount.
- `LevaRootProps.clearOnUnmount` — panel-level flag; when `true` all inputs managed by that panel are cleared on unmount, overriding the per-input setting.
