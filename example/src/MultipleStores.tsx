import React, { useEffect } from 'react'
import { folder, Leva, useControls, LevaPanel, usePanel, button } from 'leva'
import { useDrag, addV } from 'react-use-gesture'

function Box({ index, selected, setSelect }) {
  const [{ position, size, fill, color, width }, store, set] = usePanel({
    position: { value: [window.innerWidth / 2 - 150, window.innerHeight / 2], step: 1 },
    size: { value: { width: 100, height: 100 }, min: 10 },
    fill: '#cfcfcf',
    stroke: folder({ color: '#555555', width: { value: 1, min: 0, max: 10 } }),
  })

  const bind = useDrag(
    ({ first, movement: [x, y], args: [control, mod], memo = { p: position, s: Object.values(size) } }) => {
      if (first) setSelect([index, store])
      let v
      switch (control) {
        case 'position':
          v = { position: addV(memo.p, [x, y]) }
          break
        case 'width':
          v = { size: [memo.s[0] + x * mod, memo.s[1]] }
          if (mod === -1) v.position = [memo.p[0] + x, memo.p[1]]
          break
        case 'height':
          v = { size: [memo.s[0], memo.s[1] + y * mod] }
          if (mod === -1) v.position = [memo.p[0], memo.p[1] + y]
          break
      }
      set(v)
      return memo
    }
  )

  useEffect(() => {
    setSelect([index, store])
  }, [index, store, setSelect])

  return (
    <div
      tabIndex={index}
      className={`box ${selected ? 'selected' : ''}`}
      style={{
        background: fill,
        width: size.width,
        height: size.height,
        border: `${width}px solid ${color}`,
        transform: `translate(${position[0]}px, ${position[1]}px)`,
      }}>
      <span className="handle top" {...bind('height', -1)} />
      <span className="handle right" {...bind('width', 1)} />
      <span className="handle bottom" {...bind('height', 1)} />
      <span className="handle left" {...bind('width', -1)} />
      <span className="handle position" {...bind('position')} />
    </div>
  )
}

export default function App() {
  const [boxes, setBoxes] = React.useState<number[]>([])
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
    if (e.target === e.currentTarget) {
      setSelection([-1, null])
    }
  }

  const addBox = () => {
    setBoxes((b) => [...b, Date.now()])
  }

  useControls({ 'New Box': button(addBox) })

  return (
    <div className="wrapper">
      <div className="canvas" onClick={unSelect}>
        {boxes.map((v, i) => (
          <Box key={v} selected={selection === i} index={i} setSelect={setSelection} />
        ))}
      </div>
      <div className="panel">
        <Leva detached={false} hideTitleBar />
        <LevaPanel store={store} />
      </div>
    </div>
  )
}
