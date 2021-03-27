---
'leva': patch
---

fix: correct onUpdate for a blurred input: previously bluring an input from a
store while selecting a second store would commit the change on the second
store.

fix: return number previous value when field is empty.

types: (internal) fix default useInputContext types.
