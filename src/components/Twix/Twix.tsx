import React, { useMemo } from 'react'
import { ThemeProvider } from '@xstyled/styled-components'
import { useVisiblePaths } from '../../store'
import { Folder } from './../Folder/'
import { buildTree } from './tree'
import { Root } from './StyledTwix'
import { TwixTheme } from '../styles'

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
