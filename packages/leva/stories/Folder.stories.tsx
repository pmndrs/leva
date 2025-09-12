import Reset from './components/decorator-reset'
import { StoryFn, Meta } from '@storybook/react'

import { folder, useControls } from '../src'

export default {
  title: 'Misc/Folders',
  decorators: [Reset],
} as Meta

const Template: StoryFn = (args) => {
  const values = useControls(
    args.name,
    {
      foo: 0,
      bar: false,
    },
    args.options
  )

  const otherValues = useControls('Another Folder', {
    foo: 0,
    bar: false,
  })

  return (
    <div>
      <pre>{JSON.stringify({ ...values, ...otherValues }, null, '  ')}</pre>
    </div>
  )
}

export const Simple = Template.bind({})
Simple.args = { name: 'Regular folder' }

export const Collapsed = Template.bind({})
Collapsed.args = {
  options: { collapsed: true },
  name: 'collapsedFolder',
}

export const Color = Template.bind({})
Color.args = {
  options: { color: 'yellow' },
  name: 'withColor',
}

const FolderHelperTemplate: StoryFn = (args) => {
  const values = useControls({
    myFolder: folder(
      {
        x: '#ff005b',
        y: true,
        z: 'hello',
      },
      { collapsed: args.collapsed }
    ),
  })

  return (
    <div>
      <pre>{JSON.stringify(values, null, '  ')}</pre>
    </div>
  )
}

export const FolderHelper = FolderHelperTemplate.bind({})
FolderHelper.args = { collapsed: true }

export const NestedFolders = () => {
  const values = useControls('Named Folder', {
    foo: 0,
    'First Folder': folder({
      x: 0,
      y: 1,
      'Second Folder': folder({
        a: 'hello',
        b: 'ff005b',
      }),
      'Third Collapsed Folder': folder(
        {
          e: 'hello',
          f: 'ff005b',
        },
        {
          collapsed: true,
        }
      ),
    }),
  })

  return (
    <div>
      <pre>{JSON.stringify(values, null, '  ')}</pre>
    </div>
  )
}

export const OrderedFolders = () => {
  const values = useControls(() => ({
    last: folder({ firstVal: 0 }, { order: 1, collapsed: true }),
    middle: folder({ secondVal: 0 }, { order: -1, collapsed: true }),
    first: { value: 0, order: -2 },
  }))

  return (
    <div>
      <pre>{JSON.stringify(values, null, '  ')}</pre>
    </div>
  )
}
