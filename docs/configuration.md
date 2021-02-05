## Configuration

You can configure `leva` by using the `<Leva>` component anywhere in your App:

```jsx
import { Leva } from 'leva'

export default function MyApp() {

  return (
    <>
      <Leva
        oneLineLabels   // default = false, alternative layout for labels, with labels and fields on separate rows  
        hideTitleBar    // default = false, hides the GUI header
        collapsed       // default = false, when true the GUI is collpased
      />
    </>
  )

}
```
