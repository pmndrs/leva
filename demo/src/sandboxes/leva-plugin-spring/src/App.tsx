import { useControls } from 'leva'
import { spring } from '@leva-ui/plugin-spring'

export default function App() {
  const { mySpring } = useControls({
    mySpring: spring({ tension: 100, friction: 30, hint: 'spring to use with react-spring' }),
  })

  return (
    <div className="App">
      <pre>{JSON.stringify(mySpring, null, '  ')}</pre>
    </div>
  )
}
