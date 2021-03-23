## Leva Plot

### Installation

```bash
npm i @leva-ui/plugin-plot
```

### Quick start

```jsx
import { useControls } from "leva"
import { plot } from "@leva-ui/plugin-plot"

function MyComponent() {
  const { y } = useControls({ y: plot({ expression: 'cos(x)', graph: true, boundsX: [-10,10], boundsY: [0, 100] }) })
  return y(Math.PI)
}
```
