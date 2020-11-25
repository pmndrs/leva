import React, { useMemo } from 'react'
import styled, { ThemeProvider } from '@xstyled/styled-components'
import { useVisiblePaths } from '../../store'
import { Folder } from './../Folder/'
import { buildTree } from './tree'
import { TwixTheme } from '../styles'

const Root = styled.div`
  /* position */
  position: absolute;
  top: 10px;
  right: 10px;

  /* global styling */
  font-family: mono;
  font-size: root;
  width: root;
  overflow: hidden;
  background-color: root-bg;
  border-radius: root;
  box-shadow: root;
  border-style: solid;
  border-width: root;
  border-color: root-border;

  &,
  *,
  *:after,
  *:before {
    box-sizing: border-box;
  }
  *::selection {
    background-color: selection;
  }
`

export function Twix({ theme = TwixTheme }) {
  const paths = useVisiblePaths()
  const tree = useMemo(() => buildTree(paths), [paths])

  if (!('__root' in tree)) return null
  return (
    <ThemeProvider theme={theme}>
      <Root>
        <Folder root tree={tree.__root} />
      </Root>
    </ThemeProvider>
  )
}
