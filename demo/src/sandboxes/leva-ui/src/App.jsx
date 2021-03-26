import React, { useEffect, useCallback } from 'react'
import { useDropzone } from 'react-dropzone'
import { folder, Leva, useControls, LevaPanel, useCreateStore, button } from 'leva'
import { useDrag, addV } from 'react-use-gesture'
import './styles.css'

function Box({ index, selected, setSelect }) {
  const store = useCreateStore()

  const [{ position, size, color, fillColor, fillMode, fillImage, width }, set] = useControls(
    () => ({
      position: {
        value: [window.innerWidth / 2 - 150, window.innerHeight / 2],
        step: 1,
      },
      size: { value: { width: 100, height: 100 }, min: 10, lock: true },
      fillMode: { value: 'color', options: ['image'] },
      fillColor: {
        value: '#cfcfcf',
        label: 'fill',
        render: (get) => get('fillMode') === 'color',
      },
      fillImage: {
        image: undefined,
        label: 'fill',
        render: (get) => get('fillMode') === 'image',
      },
      stroke: folder({ color: '#555555', width: { value: 1, min: 0, max: 10 } }),
    }),
    { store }
  )

  const bind = useDrag(({ first, movement: [x, y], args: controls, memo = { position, size } }) => {
    if (first) setSelect([index, store])
    let _position = [...memo.position]
    let _size = { ...memo.size }

    controls.forEach(([control, mod]) => {
      switch (control) {
        case 'position':
          _position = addV(_position, [x, y])
          break
        case 'width':
          _size.width += x * mod
          if (mod === -1) _position[0] += x
          break
        case 'height':
          _size.height += y * mod
          if (mod === -1) _position[1] += y
          break
        default:
      }
    })
    set({ position: _position, size: _size })
    return memo
  })

  useEffect(() => {
    setSelect([index, store])
  }, [index, store, setSelect])

  const onDrop = useCallback(
    (acceptedFiles) => {
      if (!acceptedFiles.length) return
      set({ fillImage: acceptedFiles[0], fillMode: 'image' })
    },
    [set]
  )

  const { getRootProps, isDragAccept } = useDropzone({
    maxFiles: 1,
    accept: 'image/*',
    onDrop,
  })

  const background = fillMode === 'color' || !fillImage ? fillColor : `center / cover no-repeat url(${fillImage})`

  return (
    <div
      {...getRootProps()}
      tabIndex={index}
      className={`box ${selected ? 'selected' : ''}`}
      style={{
        background,
        width: size.width,
        height: size.height,
        boxShadow: `inset 0 0 0 ${width}px ${color}`,
        transform: `translate(${position[0]}px, ${position[1]}px)`,
      }}>
      <span className="handle top" {...bind(['height', -1])} />
      <span className="handle right" {...bind(['width', 1])} />
      <span className="handle bottom" {...bind(['height', 1])} />
      <span className="handle left" {...bind(['width', -1])} />
      <span className="handle corner top-left" {...bind(['width', -1], ['height', -1])} />
      <span className="handle corner top-right" {...bind(['width', 1], ['height', -1])} />
      <span className="handle corner bottom-left" {...bind(['width', -1], ['height', 1])} />
      <span className="handle corner bottom-right" {...bind(['width', 1], ['height', 1])} />
      <span
        className="handle position"
        {...bind(['position'])}
        style={{ background: isDragAccept ? '#18a0fb66' : 'transparent' }}
      />
    </div>
  )
}

export default function App() {
  const [boxes, setBoxes] = React.useState([])
  const [[selection, store], setSelection] = React.useState([-1, null])
  React.useEffect(() => {
    function deleteSelection(e) {
      if (e.key === 'Backspace' && selection > -1 && e.target.classList.contains('selected')) {
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
        <Leva fill flat hideTitleBar />
        <LevaPanel store={store} fill flat hideTitleBar />
      </div>
    </div>
  )
}
