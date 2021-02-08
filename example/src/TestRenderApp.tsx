import React from 'react'
import { useControls } from 'leva'

function Box({ index }) {
  const [c] = useControls(() => ({ boxNumber: 30, boxColor: '#fff' }))
  console.log('rendering box', index, c)
  return <div style={{ margin: 10, height: c.boxNumber, width: c.boxNumber, background: c.boxColor }} />
}

export default function App() {
  const [show1, set1] = React.useState(true)
  const [show2, set2] = React.useState(true)
  useControls({ boolean: true })
  console.log('rendering App')
  return (
    <>
      {show1 && <Box index={1} />}
      {show2 && <Box index={2} />}
      <button onClick={() => set1((t) => !t)}>{show1 ? 'hide' : 'show'} controls box1</button>
      <button onClick={() => set2((t) => !t)}>{show2 ? 'hide' : 'show'} controls box2</button>
    </>
  )
}
