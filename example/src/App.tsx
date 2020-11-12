import React from 'react'
import { useTwix, folder, button, Twix } from 'use-twix'

function Comp1() {
  const t = useTwix(
    { first: { value: 5, max: 10 } },
    { color: '#fff', number: { value: 4, min: 3 } },
    folder(
      'sub',
      { a: false, b: { x: 4, z: 3 } },
      folder(
        { name: 'sub2', collapsed: true },
        { c: 4 },
        button('Click', () => console.log('hello')),
        folder('sub3', { d: { x: 3, y: 4, z: 5 } })
      )
    )
  )
  return (
    <div>
      <h1>Comp1</h1>
      {JSON.stringify(t)}
    </div>
  )
}

function Comp2() {
  const t = useTwix(
    'sub.sub2',
    { c: 4 },
    { comp2: 'prop' },
    button('Click2', () => console.log('hello2'))
  )
  return (
    <div>
      <h1>Comp2</h1>
      {JSON.stringify(t)}
    </div>
  )
}

function Comp3() {
  const t = useTwix('Comp3', { comp3: 'heya' })

  return (
    <div>
      <h1>Comp3</h1>
      {JSON.stringify(t)}
    </div>
  )
}

export default function App() {
  const [c2, setC2] = React.useState(false)
  const [c1, setC1] = React.useState(true)
  return (
    <div>
      <Twix />
      <Comp1 />
      {c2 && <Comp2 />}
      {c1 && <Comp1 />}
      <Comp3 />
      <button onClick={() => setC2(t => !t)}>{c2 ? 'Hide' : 'Show'} Comp2</button>
      <button onClick={() => setC1(t => !t)}>{c1 ? 'Hide' : 'Show'} Last Comp1</button>
    </div>
  )
}
