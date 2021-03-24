---
'leva': patch
'@leva-ui/plugin-bezier': patch
'@leva-ui/plugin-spring': patch
'@leva-ui/plugin-plot': patch
---

  Plugin: add the Bezier plugin

  ```js
  import { bezier } from '@leva-ui/plugin-bezier'
  useControls({ curve: bezier([0.25, 0.1, 0.25, 1]) })
  ```
