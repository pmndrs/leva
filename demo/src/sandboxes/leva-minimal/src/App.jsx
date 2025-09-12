import React from 'react'
import { useControls, Leva } from 'leva'
import { Half2Icon } from '@radix-ui/react-icons'
import * as RadixTooltip from '@radix-ui/react-tooltip'

export default function App() {
  const data = useControls({
    number: 10,
    minmax: { value: 12.5, min: 5.5, max: 30.5, optional: true },
    printSize: { value: 100, min: 80, max: 140, step: 10 },
    color: {
      value: '#f00',
      hint: 'Hey, we support icons and hinting values and long text will wrap!',
      label: <Half2Icon />,
    },
  })

  return (
    <RadixTooltip.Provider>
      <Leva titleBar={false} />
      <pre>{JSON.stringify(data, null, '  ')}</pre>
    </RadixTooltip.Provider>
  )
}
