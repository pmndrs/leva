import React from 'react'
import Reset from './components/decorator-reset'
import { Story, Meta } from '@storybook/react'

import { Leva, folder, useControls, lightTheme, monitor, button } from '../src'
import { spring } from '@leva-ui/plugin-spring'

export default {
  title: 'Misc/Panel options',
  decorators: [Reset],
} as Meta

const Template: Story<any> = (args) => {
  const values = useControls({
    number: 3,
    color: 'lightblue',
    folder: folder({
      select: { value: 'something', options: ['else'] },
    }),
  })

  return (
    <div>
      <Leva {...args} />
      <pre>{JSON.stringify(values, null, '  ')}</pre>
    </div>
  )
}
export const Collapsed = Template.bind({})
Collapsed.args = { collapsed: true }

export const CollapsedControlled: Story<any> = (args, context) => {
  const [collapsed, setCollapsed] = React.useState(true)
  return Template(
    {
      collapsed: {
        collapsed,
        onChange: (collapsed) => {
          setCollapsed(collapsed)
        },
      },
    },
    context
  )
}

export const OneLineLabels = Template.bind({})
OneLineLabels.args = { oneLineLabels: true }

export const HideTitleBar = Template.bind({})
HideTitleBar.args = { titleBar: false }

export const Fill = Template.bind({})
Fill.args = { fill: true }

export const Flat = Template.bind({})
Flat.args = { flat: true }

export const HideCopyButton = Template.bind({})
HideCopyButton.args = { hideCopyButton: true }

export const Title: Story<any> = (args, context) => {
  return Template({ titleBar: { title: args.title } }, context)
}
Title.args = { title: 'Custom title' }

export const Drag: Story<any> = (args, context) => {
  return Template({ titleBar: { drag: args.drag } }, context)
}
Drag.args = { drag: true }

export const Filter: Story<any> = (args, context) => {
  return Template({ titleBar: { filter: args.filter } }, context)
}
Filter.args = { filter: true }

export const Theme: Story<any> = (args) => {
  const ref = React.useRef(4)

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

  return (
    <div>
      <Leva theme={args.light ? lightTheme : undefined} />
    </div>
  )
}
Theme.args = { light: true }
