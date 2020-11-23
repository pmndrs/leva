import React, { useMemo } from 'react'
import styled, { ThemeProvider } from '@xstyled/styled-components'
import { useVisiblePaths } from '../../store'
import { Folder } from './../Folder/'
import { buildTree } from './tree'
import { theme } from '../styles'

const Root = styled.div`
  font-family: ui-monospace, SFMono-Regular, Menlo, 'Roboto Mono', monospace;
  font-size: 14px;
  color: text;
  display: flex;
  position: absolute;
  top: 10px;
  right: 10px;
  width: 16rem;
  border-radius: 5px;
  background-color: background-dark;

  input[type='number'],
  input[type='text'] {
    background: transparent;
    font-family: inherit;
    color: inherit;
    font-size: inherit;
    appearance: none;
    border: none;
  }
`

export function Twix() {
  const paths = useVisiblePaths()
  const tree = useMemo(() => buildTree(paths), [paths])

  if (!('__root' in tree)) return null
  return (
    <ThemeProvider theme={theme}>
      <Root>
        <Folder tree={tree.__root} />
      </Root>
    </ThemeProvider>
  )
}
