import React, { useMemo, useEffect, useLayoutEffect } from 'react'
import ReactDOM from 'react-dom'
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

let rootInitialized = false

export function Twix({ theme = TwixTheme, fillParent = false }) {
  const paths = useVisiblePaths()
  const tree = useMemo(() => buildTree(paths), [paths])
  const [spring, set] = useSpring(() => ({ x: 0, y: 0 }))
  const bind = useDrag(({ offset: [x, y] }) => set({ x, y, immediate: true }))

  useLayoutEffect(() => {
    rootInitialized = true
  }, [])

  if (!('__root' in tree)) return null
  // we know there's a folder at the root of the root if the first
  // key isn't an input. isFolderOnTop is used to show an dummy folder at
  // the top of the pane.
  const isFolderOnTop = !isInput(Object.keys(tree.__root)[0])

  return (
    <ThemeProvider theme={theme}>
      <GlobalStyle />
      <AnimatedRoot style={spring} fillParent={fillParent}>
        <DragHandle {...bind()}>twix</DragHandle>
        <Folder root tree={tree.__root} folderOnTop={isFolderOnTop} />
      </AnimatedRoot>
    </ThemeProvider>
  )
}

export function useRenderRoot() {
  useEffect(() => {
    if (!rootInitialized) {
      const rootEl = document.createElement('div')
      if (document.body) {
        document.body.appendChild(rootEl)
        ReactDOM.render(<Twix />, rootEl)
      }
      rootInitialized = true
    }
  }, [])
}
