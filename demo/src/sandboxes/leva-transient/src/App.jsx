import React from 'react'
import { useControls, Leva } from 'leva'

function A() {
  const renderRef = React.useRef(0)
  const divRef = React.useRef(null)
  renderRef.current++
  const data = useControls({
    color: {
      value: '#f00',
      onChange: (v) => {
        divRef.current.style.color = v
        divRef.current.innerText = `Transient color is ${v}`
      },
    },
  })
  return (
    <div style={{ padding: 20, margin: 20, border: '1px solid black' }}>
      <pre>A data (should be empty)</pre>
      <pre>{JSON.stringify(data, null, '  ')}</pre>A rendered {renderRef.current} time
      <div style={{ marginTop: 20 }} ref={divRef} />
    </div>
  )
}

function B() {
  const data = useControls({
    color: { value: '#f00' },
  })
  return (
    <div style={{ padding: 20, margin: 20, border: '1px solid black' }}>
      <pre>B data (should update)</pre>
      <pre>{JSON.stringify(data, null, '  ')}</pre>
    </div>
  )
}

export default function App() {
  const [showA, setShowA] = React.useState(true)
  return (
    <>
      <button onClick={() => setShowA((s) => !s)}>{showA ? 'Hide A' : 'Show A'}</button>
      {showA && <A />}
      <B />
      <Leva hideTitleBar />
    </>
  )
}
