import React from 'react'
import { Leva, useControls } from 'leva'
import { spring } from '@leva-ui/plugin-spring'
import { TooltipProvider } from '@radix-ui/react-tooltip'

export default function App() {
  const { mySpring } = useControls({
    mySpring: spring({ tension: 100, friction: 30, hint: 'spring to use with react-spring' }),
  })

  return (
    <TooltipProvider>
      <Leva />
      <div className="App">
        <pre>{JSON.stringify(mySpring, null, '  ')}</pre>
      </div>
    </TooltipProvider>
  )
}
