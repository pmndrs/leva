import React from 'react'
import { useControls } from 'leva'
import { useDrag } from 'react-use-gesture'

function Box({ index, selected, onClick }) {
  const [{ position, color }, set] = useControls(() => ({ position: [50, 50], color: '#fff' }), {
    unique: true,
    show: selected,
  })
  const bind = useDrag(
    ({ first, movement }) => {
      if (first) onClick(index)
      else set({ position: movement })
    },
    { initial: () => position }
  )

  return (
    <div
      className={`box ${selected ? 'selected' : ''}`}
      {...bind()}
      style={{
        background: color,
        transform: `translate(${position[0]}px, ${position[1]}px)`,
      }}
    />
  )
}

const initBoxes = [0, 1, 2, 3, 4, 5, 6]

export default function App() {
  const [boxes, setBoxes] = React.useState(initBoxes)
  const [selection, setSelection] = React.useState(-1)
  React.useEffect(() => {
    function deleteSelection(e) {
      if (e.key === 'Backspace' && selection > -1) {
        setBoxes((b) => {
          const _b = [...b]
          _b.splice(selection, 1)
          return _b
        })
        setSelection(-1)
      }
    }
    window.addEventListener('keydown', deleteSelection)
    return () => window.removeEventListener('keydown', deleteSelection)
  }, [selection])
  console.log('rendering App')
  return (
    <>
      {boxes.map((v, i) => (
        <Box key={v} selected={selection === i} index={i} onClick={setSelection} />
      ))}
    </>
  )
}
