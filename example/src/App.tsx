import React from 'react'
import { useTwix, folder, button, Twix } from 'use-twix'
import Scene3D from './Scene3D'

function Comp1() {
  const t = useTwix(
    { first: { value: 0, min: -10, max: 10 } },
    { file: { file: undefined } },
    { select: { options: ['x', 'y', ['x', 'y']] } },
    { interval: { min: -10, max: 10, bounds: [-100, 100] } },
    { color: '#fff', number: { value: 1000, min: 3 } },
    { colorObj: { r: 1, g: 2, b: 3 } },
    folder(
      'folder',
      { boolean: false, spring: { tension: 100, friction: 30 } },
      folder(
        { name: 'sub folder', collapsed: false },
        { number: 5 },
        button('Button 1', () => console.log('hello')),
        folder('sub3', {
          pos2d: { x: 3, y: 4 },
          pos2dArr: [100, 200],
          pos3d: { x: 0.3, y: 0.1, z: 0.5 },
          pos3dArr: [10, 20, 4],
        })
      )
    )
  )
  return (
    <div>
      <h1>Comp1</h1>
      <img src={t.file} width="200" />
      <pre>{JSON.stringify(t, null, 2)}</pre>
    </div>
  )
}

function Comp2() {
  const t = useTwix(
    'folder.sub folder',
    { number: 4 },
    { string: 'some string' },
    button('Button 2', () => console.log('hello2'))
  )
  return (
    <div>
      <h1>Comp2</h1>
      <pre>{JSON.stringify(t, null, 2)}</pre>
    </div>
  )
}

function Comp3() {
  const t = useTwix({ file: { file: undefined } })

  return (
    <div>
      <h1>Comp3</h1>
      <pre>{JSON.stringify(t, null, 2)}</pre>
      <img src={t.file} />
    </div>
  )
}

export default function App() {
  const [c2, setC2] = React.useState(false)
  const [c1, setC1] = React.useState(false)
  return (
    <>
      <Twix />
      <div style={{ display: 'flex' }}>
        <div style={{ width: '50%' }}>
          <Scene3D />
        </div>
        <div>
          <Comp1 />
          {/* {c2 && <Comp2 />}
      {c1 && <Comp1 />} */}
          {/* <Comp3 /> */}
          <button onClick={() => setC2(t => !t)}>{c2 ? 'Hide' : 'Show'} Comp2</button>
          <button onClick={() => setC1(t => !t)}>{c1 ? 'Hide' : 'Show'} Last Comp1</button>
        </div>
      </div>
    </>
  )
}
