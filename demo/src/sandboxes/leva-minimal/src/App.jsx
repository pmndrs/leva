import React from 'react'
import { useControls, Leva } from 'leva'
import { Half2Icon } from '@radix-ui/react-icons'

export default function App() {
  const data = useControls({
    number: 10,
    minmax: { value: 12.5, min: 5.5, max: 30.5, optional: true },
    color: { value: '#f00', hint: 'Hey, we support icons and hinting values!', label: <Half2Icon /> },
  })

  return (
    <>
      <Leva hideTitleBar />
      <pre>{JSON.stringify(data, null, '  ')}</pre>
    </>
  )
}
