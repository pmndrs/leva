import React from 'react'
import { useControls, useCreateStore, folder, Leva, LevaPanel, monitor, button } from 'leva'
import { spring } from '@leva-ui/plugin-spring'
import { Noise } from 'noisejs'

const noise = new Noise(Math.random())

function Controls() {
  const ref = React.useRef(4)
  React.useEffect(() => {
    let x = 0
    setInterval(() => {
      x += 0.1
      const t = Date.now()
      ref.current = 2 * noise.simplex2(3 * x + t, x) + (3 * Math.sin(x)) / x
    }, 30)
  }, [])

  useControls({
    number: { value: 10, step: 0.25 },
    image: { image: undefined },
    select: { options: ['x', 'y', ['x', 'y']] },
    interval: { min: -100, max: 100, value: [10, 15] },
    boolean: true,
    refMonitor: monitor(ref, { graph: true, interval: 30 }),
    folder2: folder(
      {
        color2: '#fff',
        color: {
          value: '#ff005b',
          render: (get) => get('boolean'),
        },
        folder3: folder(
          {
            'Hello Button': button(() => console.log('hello')),
            folder4: folder({
              spring: spring(),
              pos2d: { value: { x: 3, y: 4 } },
              pos2dArr: { value: [100, 200], x: { max: 300 } },
              pos3d: { value: { x: 0.3, k: 0.1, z: 0.5 }, j: { min: 0 } },
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

  return null
}

const prefix = (token) => {
  const o = {}
  for (let key in token) {
    o['leva__' + key] = token[key]
  }
  return o
}

export default function App() {
  const colorsStore = useCreateStore()
  const radiiStore = useCreateStore()
  const spaceStore = useCreateStore()
  const fontSizesStore = useCreateStore()
  const sizesStore = useCreateStore()
  const borderWidthsStore = useCreateStore()
  const fontWeightsStore = useCreateStore()

  const colors = useControls(
    {
      colors: folder({
        elevation1: '#292D39',
        elevation2: '#181C20',
        elevation3: '#373C4B',
        accent1: '#0066DC',
        accent2: '#007BFF',
        accent3: '#3C93FF',
        highlight1: '#535760',
        highlight2: '#8C92A4',
        highlight3: '#FEFEFE',
        vivid1: '#ffcc00',
      }),
    },
    { store: colorsStore }
  )

  const radii = useControls(
    {
      radii: folder({
        xs: '2px',
        sm: '3px',
        lg: '10px',
      }),
    },
    { store: radiiStore }
  )

  const space = useControls(
    {
      space: folder({
        sm: '6px',
        md: '10px',
        rowGap: '7px',
        colGap: '7px',
      }),
    },
    { store: spaceStore }
  )

  const fontSizes = useControls(
    {
      fontSizes: folder({
        root: '11px',
      }),
    },
    { store: fontSizesStore }
  )

  const sizes = useControls(
    {
      sizes: folder({
        rootWidth: '280px',
        controlWidth: '160px',
        scrubberWidth: '8px',
        scrubberHeight: '16px',
        rowHeight: '24px',
        folderHeight: '20px',
        checkboxSize: '16px',
        joystickWidth: '100px',
        joystickHeight: '100px',
        colorPickerWidth: '160px',
        colorPickerHeight: '100px',
        monitorHeight: '60px',
        titleBarHeight: '39px',
      }),
    },
    { store: sizesStore }
  )

  const borderWidths = useControls(
    {
      borderWidths: folder({
        root: '0px',
        input: '1px',
        focus: '1px',
        hover: '1px',
        active: '1px',
        folder: '1px',
      }),
    },
    { store: borderWidthsStore }
  )

  const fontWeights = useControls(
    {
      fontWeights: folder({
        label: { value: 'normal', options: ['bold', 'light'] },
        folder: { value: 'normal', options: ['bold', 'light'] },
        button: { value: 'normal', options: ['bold', 'light'] },
      }),
    },
    { store: fontWeightsStore }
  )

  const theme = {
    colors: prefix(colors),
    radii: prefix(radii),
    space: prefix(space),
    fontSizes: prefix(fontSizes),
    sizes: prefix(sizes),
    borderWidths: prefix(borderWidths),
    fontWeights: prefix(fontWeights),
  }

  return (
    <div style={{ backgroundColor: 'lightgray', minHeight: '100vh' }}>
      <Leva theme={theme} />
      <div
        style={{
          display: 'grid',
          width: 300,
          gap: 10,
          paddingBottom: 40,
          overflow: 'auto',
          background: '#181C20',
        }}>
        <LevaPanel fill flat hideTitleBar store={colorsStore} />
        <LevaPanel fill flat hideTitleBar store={radiiStore} />
        <LevaPanel fill flat hideTitleBar store={spaceStore} />
        <LevaPanel fill flat hideTitleBar store={fontSizesStore} />
        <LevaPanel fill flat hideTitleBar store={sizesStore} />
        <LevaPanel fill flat hideTitleBar store={borderWidthsStore} />
        <LevaPanel fill flat hideTitleBar store={fontWeightsStore} />
      </div>
      <Controls />
    </div>
  )
}

export function App4() {
  const x = useControls({
    number: 10,
    minmax: {
      value: 10.5,
      min: 5.5,
      max: 30.5,
    },
  })

  return <pre>{JSON.stringify(x, null, '  ')}</pre>
}
