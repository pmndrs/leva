# @leva-ui/plugin-spring

## 0.8.1

### Patch Changes

- c997410: Plugin: add the Bezier plugin

  ```js
  import { bezier } from '@leva-ui/plugin-bezier'
  useControls({ curve: bezier([0.25, 0.1, 0.25, 1]) })
  ```

- Updated dependencies [c997410]
  - leva@0.8.1

## 0.8.0

### Patch Changes

- edc8847: Breaking: change how `leva/plugin` exports components.

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

  ```js
  import { plot } from '@leva-ui/plugin-plot'
  useControls({ y: plot({ expression: 'cos(x)', graph: true, boundsX: [-10, 10], boundsY: [0, 100] }) })
  ```

- Updated dependencies [edc8847]
  - leva@0.8.0

## 0.7.0

### Patch Changes

- Updated dependencies [f323cfc]
- Updated dependencies [0b7e968]
  - leva@0.7.0

## 0.6.0

### Patch Changes

- Updated dependencies [ce42683]
  - leva@0.6.0
