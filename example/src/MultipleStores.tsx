import React from 'react'
import { LevaPanel, usePanel } from 'leva'
import { useDrag } from 'react-use-gesture'

function Box({ index, selected, onClick }) {
  const [[{ position, color }, set], store] = usePanel(() => ({
    position: [50 * index, 50],
    color: '#fff',
  }))
  const bind = useDrag(
    ({ first, movement }) => {
      if (first) onClick([index, store])
      else set({ position: movement })
    },
    { initial: () => position }
  )

  return (
    <div
      tabIndex={index}
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
  const [[selection, store], setSelection] = React.useState([-1, null])
  React.useEffect(() => {
    function deleteSelection(e) {
      if (e.key === 'Backspace' && selection > -1) {
        setBoxes((b) => {
          const _b = [...b]
          _b.splice(selection, 1)
          return _b
        })
        setSelection([-1, null])
      }
    }
    window.addEventListener('keydown', deleteSelection)
    return () => window.removeEventListener('keydown', deleteSelection)
  }, [selection])

  const unSelect = (e) => {
    e.target === e.currentTarget && setSelection([-1, null])
  }

  return (
    <div onClick={unSelect}>
      <LevaPanel store={store} detached />
      {boxes.map((v, i) => (
        <Box key={v} selected={selection === i} index={i} onClick={setSelection} />
      ))}
    </div>
  )
}
