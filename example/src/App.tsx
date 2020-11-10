import React from 'react'
import { useTwix, folder, Twix } from 'use-twix'

function Comp1() {
  const t = useTwix(
    { color: '#fff', number: { value: 4, min: 3 } },
    folder('sub', { a: false, b: 3 }, folder('sub2', { c: 4 }))
  )
  return (
    <div>
      <h1>Comp1</h1>
      {JSON.stringify(t)}
    </div>
  )
}

function Comp2() {
  const t = useTwix('sub.sub2', { comp2: 'prop' })
  return (
    <div>
      <h1>Comp2</h1>
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
      <button onClick={() => setC2(t => !t)}>{c2 ? 'Hide' : 'Show'} Comp2</button>
      <button onClick={() => setC1(t => !t)}>{c1 ? 'Hide' : 'Show'} Last Comp1</button>
    </div>
  )
}
