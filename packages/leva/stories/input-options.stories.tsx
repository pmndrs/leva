import React from 'react'
import { Meta } from '@storybook/react'
import Reset from './components/decorator-reset'
import { Half2Icon, OpacityIcon, DimensionsIcon } from '@radix-ui/react-icons'

import { folder, useControls } from '../src'

export default {
  title: 'Misc/Input options',
  decorators: [Reset],
} as Meta

export const LabelAndIcon = () => {
  const values = useControls({
    string: { value: 'hello', label: 'My string' },
    color: { value: '#f00', label: <Half2Icon /> },
    opacity: { value: 0.5, label: <OpacityIcon /> },
    size: { value: { width: 200, height: 300 }, label: <DimensionsIcon /> },
  })

  return (
    <div>
      <pre>{JSON.stringify(values, null, '  ')}</pre>
    </div>
  )
}

export const Hint = () => {
  const values = useControls({
    color: { value: '#f00', hint: 'Used for important content' },
    position: { value: [0, 0, 0], hint: 'Position of the object relative to the screen' },
  })

  return (
    <div>
      <pre>{JSON.stringify(values, null, '  ')}</pre>
    </div>
  )
}

export const Render = () => {
  const values = useControls({
    show: { value: true, label: 'Show color' },
    color: { value: '#fff', render: (get) => get('show') },
    show2: { value: false, label: 'Show folder' },
    folder: folder(
      {
        number: 1,
        string: {
          value: 'shown if `number >= 1`',
          render: (get) => get('folder.number') >= 1,
        },
      },
      { render: (get) => get('show2') }
    ),
  })

  return (
    <div>
      <pre>{JSON.stringify(values, null, '  ')}</pre>
    </div>
  )
}

export const Optional = () => {
  const values = useControls({
    color: { value: '#f00', optional: true },
    vector: { value: [0, 0, 0], optional: true, disabled: true },
  })
  return (
    <div>
      <pre>{JSON.stringify(values, null, '  ')}</pre>
    </div>
  )
}

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

export const OnChange = () => {
  const [showA, setShowA] = React.useState(true)
  return (
    <>
      <button onClick={() => setShowA((s) => !s)}>{showA ? 'Hide A' : 'Show A'}</button>
      {showA && <A />}
      <B />
    </>
  )
}
