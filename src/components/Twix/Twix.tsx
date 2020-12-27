import React, { useMemo, useState, useEffect, useLayoutEffect } from 'react'
import ReactDOM from 'react-dom'
import { ThemeProvider, createGlobalStyle } from '@xstyled/styled-components'

import { useDrag } from 'react-use-gesture'
import { useSpring, a } from 'react-spring'
import { useVisiblePaths } from '../../store'
import { buildTree } from './tree'
import { Folder } from './../Folder/'
import { isInput } from '../../utils'

import { Root, DragHandle, StyledSearch } from './StyledTwix'
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

type SearchProps = { value: string; onChange: (value: string) => void }

export function Search({ value, onChange }: SearchProps) {
  const _onChange = (e: React.ChangeEvent<HTMLInputElement>) => onChange(e.target.value)
  return (
    <StyledSearch>
      <input value={value} placeholder="Search" onChange={_onChange} />
    </StyledSearch>
  )
}

export function Twix({ theme = TwixTheme, fillParent = false }) {
  const paths = useVisiblePaths()
  const [filter, setFilter] = useState('')
  const tree = useMemo(() => buildTree(paths, filter), [paths, filter])
  const [spring, set] = useSpring(() => ({ x: 0, y: 0 }))
  const bind = useDrag(({ offset: [x, y] }) => set({ x, y, immediate: true }))

  useLayoutEffect(() => {
    rootInitialized = true
  }, [])

  if (paths.length < 1) return null
  // we know there's a folder at the root of the root if the first
  // key isn't an input. isFolderOnTop is used to show an dummy folder at
  // the top of the pane.
  const keys = Object.keys(tree)
  const isFolderOnTop = keys.length > 0 && !isInput(keys[0])

  return (
    <ThemeProvider theme={theme}>
      <GlobalStyle />
      <AnimatedRoot style={spring} fillParent={fillParent}>
        <DragHandle {...bind()}>twix</DragHandle>
        <Search value={filter} onChange={setFilter} />
        <Folder root tree={tree} folderOnTop={isFolderOnTop} />
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
