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

Feat: add `useValue` / `useValues` hooks that let an input query other inputs values. 

Feat: `normalize` has additional arguments to its signature:

```ts
/**
 * @path the path of the input 
 * @data the data available in the store
 */
const normalize = (input: Input, path: string, data: Data)
```

Feat: `sanitize` has additional arguments to its signature:

```ts
/**
 * @path the path of the input 
 * @store the store
 */
const sanitize = (
  value: any,
  settings: Settings,
  prevValue: any,
  path: string,
  store: StoreType
)
```


Styles: better feedback when dragging number from inner label.

Plugin: add the Plot plugin 📈
