## Leva Plot

### Installation

```bash
npm i @leva-ui/plugin-plot
```

### Quick start

```jsx
import { useControls } from "leva"
import { bezier } from "@leva-ui/plugin-bezier"

function MyComponent() {
  const { curve } = useControls({ curve: bezier() })
  // or
  const { curve } = useControls({ curve: bezier([0.54, 0.05, 0.6, 0.98]) })
  // or
  const { curve } = useControls({ curve: bezier('in-out-quadratic') })
  // or 
  const { curve } = useControls({ curve: bezier({ handles: [0.54, 0.05, 0.6, 0.98], graph: false }) })

  // built-in function evaluation
  console.log(curve.evaluate(0.3))

  // inside a css like animation-timing-function
  return <div style={{animationTimingFunction: value.cssEasing}} />
}
```
