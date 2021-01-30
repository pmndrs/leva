import React, { useMemo, useState, useEffect } from 'react'
import ReactDOM from 'react-dom'
import { useDrag } from 'react-use-gesture'
import { useSpring, a } from 'react-spring'

import { useVisiblePaths } from '../../store'
import { buildTree } from './tree'
import { Folder } from '../Folder'
import { Filter } from './Filter'

import { useDeepMemo } from '../../hooks'
import { isInput } from '../../utils'

import { Root, DragHandle } from './StyledLeva'
import { mergeTheme, globalStyles } from '../../styles'
import { ThemeContext } from '../../context'

const AnimatedRoot = a(Root)

let rootInitialized = false

export function Leva({ theme = {}, fillParent = false, collapsed = false }) {
  // data
  const paths = useVisiblePaths()
  const [filter, setFilter] = useState('')
  const tree = useMemo(() => buildTree(paths, filter), [paths, filter])

  // theme
  globalStyles()
  const { mergedTheme, themeCss } = useDeepMemo(() => mergeTheme(theme), [theme])

  // drag
  const [spring, set] = useSpring(() => ({ x: 0, y: 0 }))
  const bind = useDrag(({ offset: [x, y] }) => set({ x, y, immediate: true }))

  // TODO check if using useEffect is the right hook (we used useLayoutEffect before)
  useEffect(() => {
    rootInitialized = true
  }, [])

  if (paths.length < 1) return null
  // we know there's a folder at the root of the root if the first
  // key isn't an input. isFolderOnTop is used to show an dummy folder at
  // the top of the pane.
  const values = Object.values(tree)
  const isFolderOnTop = values.length > 0 && !isInput(values[0])

  return (
    <ThemeContext.Provider value={mergedTheme}>
      <AnimatedRoot className={themeCss} style={spring} fillParent={fillParent}>
        <DragHandle {...bind()}>leva</DragHandle>
        <Filter onChange={setFilter} />
        <Folder isRoot tree={tree} folderOnTop={isFolderOnTop} collapsed={collapsed} />
      </AnimatedRoot>
    </ThemeContext.Provider>
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
