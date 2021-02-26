import React from 'react'
import { useControls, Leva } from 'leva'

export default function App() {
  const data = useControls({
    first: { value: 0, min: -10, max: 10 },
  })

  return (
    <>
      <Leva hideTitleBar />
      <pre>{JSON.stringify(data, null, '  ')}</pre>
    </>
  )
}
