import React from 'react'
import { useControls, Leva } from 'leva'

export default function App() {
  const data = useControls({
    number: 10,
    minmax: { value: 12.5, min: 5.5, max: 30.5 },
    color: '#f00',
  })

  return (
    <>
      <Leva hideTitleBar />
      <pre>{JSON.stringify(data, null, '  ')}</pre>
    </>
  )
}
