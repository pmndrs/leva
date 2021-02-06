import React, { useMemo, useState } from 'react'

import { StoreType } from '../../store'
import { buildTree } from './tree'
import { TreeWrapper } from '../Folder'

import { useDeepMemo, useTransform, useVisiblePaths } from '../../hooks'

import { StyledRoot } from './StyledLeva'
import { mergeTheme, globalStyles, LevaCustomTheme } from '../../styles'
import { ThemeContext, StoreContext } from '../../context'
import { TitleWithFilter } from './Filter'

export type LevaRootProps = {
  theme: LevaCustomTheme
  store: StoreType
  fillParent: boolean
  collapsed: boolean
  oneLineLabels: boolean
  hideTitleBar: boolean
}

export function LevaRoot({ theme = {}, store, fillParent, collapsed, oneLineLabels, hideTitleBar }: LevaRootProps) {
  // data
  const paths = useVisiblePaths(store)
  const [filter, setFilter] = useState('')
  const tree = useMemo(() => buildTree(paths, filter), [paths, filter])

  // theme
  globalStyles()
  const { mergedTheme, themeCss } = useDeepMemo(() => mergeTheme(theme), [theme])

  // drag
  const [rootRef, set] = useTransform<HTMLDivElement>()

  // collapsible
  const [toggled, setToggle] = useState(!collapsed)

  // this generally happens on first render.
  if (paths.length < 1) return null

  return (
    <ThemeContext.Provider value={mergedTheme}>
      <StyledRoot ref={rootRef} className={themeCss} fillParent={fillParent} oneLineLabels={oneLineLabels}>
        {!hideTitleBar && (
          <TitleWithFilter onDrag={set} setFilter={setFilter} toggle={() => setToggle((t) => !t)} toggled={toggled} />
        )}
        <StoreContext.Provider value={store}>
          <TreeWrapper isRoot tree={tree} toggled={toggled} />
        </StoreContext.Provider>
      </StyledRoot>
    </ThemeContext.Provider>
  )
}
