import React from 'react'
import { useControls } from 'leva'
import { useDrag } from 'react-use-gesture'

function Box({ index }) {
  const [{ position, color }, set] = useControls(() => ({ position: [50, 50], color: '#fff' }), { unique: true })
  const bind = useDrag(({ movement }) => set({ position: movement }), { initial: () => position })

  return (
    <div
      {...bind()}
      style={{
        margin: 10,
        height: 100,
        width: 100,
        background: color,
        transform: `translate(${position[0]}px, ${position[1]}px)`,
      }}
    />
  )
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
