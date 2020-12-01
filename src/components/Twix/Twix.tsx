import React, { useMemo } from 'react'
import { ThemeProvider, createGlobalStyle } from '@xstyled/styled-components'
import { useVisiblePaths } from '../../store'
import { Folder } from './../Folder/'
import { buildTree } from './tree'
import { Root } from './StyledTwix'
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

export function Twix({ theme = TwixTheme }) {
  const paths = useVisiblePaths()
  const tree = useMemo(() => buildTree(paths), [paths])

  if (!('__root' in tree)) return null
  return (
    <ThemeProvider theme={theme}>
      <GlobalStyle />
      <Root>
        <Folder root tree={tree.__root} />
      </Root>
    </ThemeProvider>
  )
}
