import React from 'react'
import {
  useControls,
  folder,
  button,
  monitor,
  Leva,
  usePanel,
  LevaPanel,
  LevaStoreProvider,
  usePanelControls,
} from 'leva'
import { spring } from '@leva-ui/plugin-spring'
import { Noise } from 'noisejs'
import Scene3D from './Scene3D'
import { greenOrBlue } from './myPlugin'

const noise = new Noise(Math.random())

function Comp1() {
  const ref = React.useRef(4)
  React.useEffect(() => {
    let x = 0
    setInterval(() => {
      x += 0.1
      const t = Date.now()
      ref.current = 2 * noise.simplex2(3 * x + t, x) + (3 * Math.sin(x)) / x
    }, 30)
  }, [])

  const t = useControls({
    folder5: folder({
      boolean2: false,
    }),
    firstsuperlonglabel: { value: 40, min: 30, max: 90 },
    myPlugin: greenOrBlue({ color: 'green', light: true, alpha: 0.5 }),
    // wrong: { something: 'else' },
    image: { image: undefined },
    select: { options: ['x', 'y', ['x', 'y']] },
    interval: { min: -100, max: 100, value: [-10, 10] },
    boolean: true,
    color: { value: '#ffffffff', render: (get) => get('boolean') },
    refMonitor: monitor(ref, { graph: true, interval: 30 }),
    // number: { value: 1000, min: 3 },
    folder2: folder(
      {
        spring: spring({ tension: 100, friction: 30 }),
        folder3: folder(
          {
            // 'Hello Button': button(() => console.log('hello')),
            folder4: folder({
              string: 'hello',
              pos2d: { value: { x: 3, y: 4 } },
              pos2dArr: [100, 200],
              pos3d: { x: 0.3, y: 0.1, z: 0.5 },
              pos3dArr: [Math.PI / 2, 20, 4],
            }),
          },
          { collapsed: false }
        ),
      },
      { render: (get) => get('boolean') }
    ),

    colorObj: { r: 1, g: 2, b: 3 },
  })

  console.log(t.colorObj)
  console.log(t.pos2d)
  console.log(t.string)
  console.log(t.myPlugin)

  return (
    <div>
      <h1>Comp1</h1>
      <img src={t.image} width="200" alt="" />
      <pre>{JSON.stringify(t, null, 2)}</pre>
    </div>
  )
}

function Comp2() {
  const t = useControls('folder2.folder3', {
    number: 4,
    string: 'some string',
    'Button 2': button(() => console.log('hello2')),
  })
  return (
    <div>
      <h1>Comp2</h1>
      <pre>{JSON.stringify(t, null, 2)}</pre>
    </div>
  )
}

/**
 * Unused @todo remove
 */
// function Comp3() {
//   const t = useControls({ file: { file: undefined } })

//   return (
//     <div>
//       <h1>Comp3</h1>
//       <pre>{JSON.stringify(t, null, 2)}</pre>
//       <img src={t.file} />
//     </div>
//   )
// }

export function App1() {
  const [c1, setC1] = React.useState(true)
  const [c2, setC2] = React.useState(false)
  const { oneLineLabels, hideTitleBar } = useControls({ oneLineLabels: false, hideTitleBar: false })
  // useControls({ color: '#ffffff' })
  return (
    <>
      <Leva oneLineLabels={oneLineLabels} hideTitleBar={hideTitleBar} />
      <div style={{ display: 'flex' }}>
        {/* <div style={{ width: '50%' }}>{c2 && <Scene3D />}</div> */}
        <div>
          {c1 && <Comp1 />}
          {c2 && <Comp1 />}
          <Comp2 />
          <button onClick={() => setC1((t) => !t)}>{c1 ? 'Hide' : 'Show'} Json</button>
          <button onClick={() => setC2((t) => !t)}>{c2 ? 'Hide' : 'Show'} Scene</button>
        </div>
      </div>
    </>
  )
}

function MyComponent() {
  usePanelControls({ point: [0, 0] })
  return null
}

export function App2() {
  const [, store1] = usePanel({ color: '#fff' })
  const [, store2] = usePanel({ boolean: true })
  return (
    <div
      style={{
        display: 'grid',
        width: 300,
        gridRowGap: 10,
        padding: 10,
        background: '#fff',
      }}>
      <LevaPanel store={store1} />
      <LevaPanel store={store2} detached />
      <LevaStoreProvider store={store1}>
        <MyComponent />
      </LevaStoreProvider>
    </div>
  )
}

export function App3() {
  const [colors, colorStore] = usePanel({
    colors: folder({
      $elevation1: '#292D39',
      $elevation2: '#181C20',
      $elevation3: '#373C4B',
      $accent1: '#0066DC',
      $accent2: '#007BFF',
      $accent3: '#3C93FF',
      $highlight1: '#535760',
      $highlight2: '#8C92A4',
      $highlight3: '#FEFEFE',
    }),
  })
  const [radii, radiiStore] = usePanel({
    radii: folder({
      $xs: '2px',
      $sm: '3px',
      $lg: '10px',
    }),
  })

  const [space, spaceStore] = usePanel({
    space: folder({
      $sm: '6px',
      $md: '10px',
      $rowGap: '7px',
      $colGap: '7px',
    }),
  })
  const [fontSizes, fontSizesStore] = usePanel({
    fontSizes: folder({
      $root: '11px',
    }),
  })
  const [sizes, sizesStore] = usePanel({
    sizes: folder({
      $rootWidth: '280px',
      $controlWidth: '160px',
      $scrubberWidth: '8px',
      $scrubberHeight: '16px',
      $rowHeight: '24px',
      $folderHeight: '20px',
      $checkboxSize: '16px',
      $joystickWidth: '100px',
      $joystickHeight: '100px',
      $colorPickerWidth: '160px',
      $colorPickerHeight: '100px',
      $monitorHeight: '60px',
    }),
  })
  const [borderWidths, borderStore] = usePanel({
    borderWidths: folder({
      $root: '0px',
      $input: '1px',
      $focus: '1px',
      $hover: '1px',
      $active: '1px',
      $folder: '1px',
    }),
  })
  const [fontWeights, weightsStore] = usePanel({
    fontWeights: folder({
      $label: { value: 'normal', options: ['bold', 'light'] },
      $folder: { value: 'normal', options: ['bold', 'light'] },
      $button: { value: 'normal', options: ['bold', 'light'] },
    }),
  })

  const theme = {
    colors,
    radii,
    space,
    fontSizes,
    sizes,
    borderWidths,
    fontWeights,
  }

  return (
    <>
      <Leva theme={theme} />
      <div
        style={{
          display: 'grid',
          width: 300,
          gridRowGap: 10,
          padding: 10,
          background: '#fff',
          maxHeight: '90vh',
          overflow: 'auto',
        }}>
        <LevaPanel store={colorStore} />
        <LevaPanel store={radiiStore} />
        <LevaPanel store={spaceStore} />
        <LevaPanel store={fontSizesStore} />
        <LevaPanel store={sizesStore} />
        <LevaPanel store={borderStore} />
        <LevaPanel store={weightsStore} />
      </div>
      <Comp1 />
    </>
  )
}
