import React, { useMemo, useState, useEffect } from 'react'
import ReactDOM from 'react-dom'

import { useVisiblePaths } from '../../store'
import { buildTree } from './tree'
import { TreeWrapper } from '../Folder'

import { useDeepMemo, useTransform } from '../../hooks'

import { Root } from './StyledLeva'
import { mergeTheme, globalStyles } from '../../styles'
import { ThemeContext } from '../../context'
import { TitleWithFilter } from './Filter'

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
  const [rootRef, set] = useTransform<HTMLDivElement>()

  // collapsible
  const [toggled, setToggle] = useState(!collapsed)

  // TODO check if using useEffect is the right hook (we used useLayoutEffect before)
  useEffect(() => {
    rootInitialized = true
  }, [])

  if (paths.length < 1) return null

  /**
   * @todo remove
   * we know there's a folder at the root of the root if the first
   * key isn't an input. isFolderOnTop is used to show an dummy folder at
   * the top of the pane.
   */
  // const values = Object.values(tree)
  // const isFolderOnTop = values.length > 0 && !isInput(values[0])

  return (
    <ThemeContext.Provider value={mergedTheme}>
      <Root ref={rootRef} className={themeCss} fillParent={fillParent}>
        <TitleWithFilter onDrag={set} setFilter={setFilter} toggle={() => setToggle((t) => !t)} toggled={toggled} />
        <TreeWrapper isRoot tree={tree} toggled={toggled} />
      </Root>
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
