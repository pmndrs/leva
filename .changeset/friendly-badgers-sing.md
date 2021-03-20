---
'leva': minor
'@leva-ui/plugin-plot': patch
'@leva-ui/plugin-spring': patch
---

Breaking: change how `leva/plugin` exports components.

```jsx
// before
import { Row, Label, String } from 'leva/plugin'

// after
import { Components } from 'leva/plugin'
const { Row, Label, String } = Components 
```

Styles: better feedback when dragging number from inner label

Plugin: add the Plot plugin 📈
