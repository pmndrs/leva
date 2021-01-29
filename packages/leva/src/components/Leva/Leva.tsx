import React, { useMemo, useState, useEffect, useLayoutEffect } from 'react'
import ReactDOM from 'react-dom'
import { ThemeProvider, createGlobalStyle } from '@xstyled/styled-components'

import { useDrag } from 'react-use-gesture'
import { useVisiblePaths } from '../../store'
import { buildTree } from './tree'
import { Folder } from '../Folder'
import { isInput, debounce } from '../../utils'

import { Root, DragHandle, StyledFilter } from './StyledLeva'
import { LevaTheme } from '../../styles'
import { useRefTransform } from '../../helpers/useRefTransform'

const GlobalStyle = createGlobalStyle`
  .leva__body__dragged {
    user-select: none;
    input {
      user-select: none;
    }
    * {
      cursor: ew-resize !important
    }
  }
`


let rootInitialized = false

type FilterProps = { onChange: (value: string) => void }

export function Filter({ onChange }: FilterProps) {
  const [value, set] = useState('')
  const debouncedOnChange = useMemo<FilterProps['onChange']>(() => debounce(onChange, 250), [onChange])

  const _onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const v = e.currentTarget.value
    set(v)
    debouncedOnChange(v)
  }

  return (
    <StyledFilter>
      <input value={value} placeholder="Filter" onChange={_onChange} />
    </StyledFilter>
  )
}

export function Leva({ theme = LevaTheme, fillParent = false, collapsed = false }) {
  const paths = useVisiblePaths()
  const [filter, setFilter] = useState('')
  const tree = useMemo(() => buildTree(paths, filter), [paths, filter])

  const [ref, set] = useRefTransform()
  
  const bind = useDrag(({ offset: [x, y] }) => set({ x, y, immediate: true }))

  useLayoutEffect(() => {
    rootInitialized = true
  }, [])

  if (paths.length < 1) return null
  // we know there's a folder at the root of the root if the first
  // key isn't an input. isFolderOnTop is used to show an dummy folder at
  // the top of the pane.
  const values = Object.values(tree)
  const isFolderOnTop = values.length > 0 && !isInput(values[0])

  return (
    <ThemeProvider theme={theme}>
      <GlobalStyle />
      <Root ref={ref} fillParent={fillParent}>
        <DragHandle {...bind()}>leva</DragHandle>
        <Filter onChange={setFilter} />
        <Folder root tree={tree} folderOnTop={isFolderOnTop} collapsed={collapsed} />
      </Root>
    </ThemeProvider>
  )
}

export function useRenderRoot() {
  useEffect(() => {
    if (!rootInitialized) {
      const rootEl = document.createElement('div')
      if (document.body) {
        document.body.appendChild(rootEl)
        ReactDOM.render(<Leva />, rootEl)
      }
      rootInitialized = true
    }
  }, [])
}
