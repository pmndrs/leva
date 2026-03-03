---
"leva": minor
---

Add `noCache` option and `store.clearPath` to discard cached input values when they are no longer in use.

- `store.clearPath(path)` — new method to imperatively discard the cached value of an input that is no longer mounted.
- `InputOptions.noCache` — per-input flag; when `true` the input's cached value is discarded from the store on unmount.
- `LevaRootProps.noCache` — panel-level flag; when `true` all inputs managed by that panel have their cached values discarded on unmount, overriding the per-input setting.
