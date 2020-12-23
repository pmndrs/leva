import React, { useMemo } from 'react'
import { ThemeProvider, createGlobalStyle } from '@xstyled/styled-components'

import { useDrag } from 'react-use-gesture'
import { useSpring, a } from 'react-spring'
import { useVisiblePaths } from '../../store'
import { buildTree } from './tree'
import { Folder } from './../Folder/'
import { isInput } from '../../utils'

import { Root, DragHandle } from './StyledTwix'
import { TwixTheme } from '../styles'

const GlobalStyle = createGlobalStyle`
  .twix__body__dragged {
    user-select: none;
    input {
      user-select: none;
    }
    * {
      cursor: ew-resize !important
    }
  }
`

const AnimatedRoot = a(Root)

export function Twix({ theme = TwixTheme }) {
  const paths = useVisiblePaths()
  const tree = useMemo(() => buildTree(paths), [paths])
  const [spring, set] = useSpring(() => ({ x: 0, y: 0 }))
  const bind = useDrag(({ offset: [x, y] }) => set({ x, y, immediate: true }))

  if (!('__root' in tree)) return null
  // we know there's a folder at the root of the root if the first
  // key isn't an input
  const isFolderOnTop = !isInput(Object.keys(tree.__root)[0])

  return (
    <ThemeProvider theme={theme}>
      <GlobalStyle />
      <AnimatedRoot style={spring}>
        <DragHandle {...bind()}>twix</DragHandle>
        <Folder root tree={tree.__root} folderOnTop={isFolderOnTop} />
      </AnimatedRoot>
    </ThemeProvider>
  )
}
