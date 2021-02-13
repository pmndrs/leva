import React, { useMemo, useState } from 'react'

import { StoreType } from '../../store'
import { buildTree } from './tree'
import { TreeWrapper } from '../Folder'

import { useDeepMemo, useTransform, useVisiblePaths } from '../../utils/hooks'

import { StyledRoot } from './StyledLeva'
import { mergeTheme, globalStyles, LevaCustomTheme } from '../../styles'
import { ThemeContext, StoreContext } from '../../context'
import { TitleWithFilter } from './Filter'

export type LevaRootProps = {
  theme: LevaCustomTheme
  store?: StoreType | null
  hidden?: boolean
  detached: boolean
  collapsed: boolean
  oneLineLabels: boolean
  hideTitleBar: boolean
}

export function LevaRoot({ store, hidden = false, ...props }: LevaRootProps) {
  if (!store || hidden) return null
  return <LevaCore store={store} {...props} />
}

type LevaCoreProps = LevaRootProps & { store: StoreType }

function LevaCore({ store, theme = {}, detached, collapsed, oneLineLabels, hideTitleBar }: LevaCoreProps) {
  const paths = useVisiblePaths(store)
  const [filter, setFilter] = useState('')
  const tree = useMemo(() => buildTree(paths, filter), [paths, filter])

  // theme
  globalStyles()
  const themeContext = useDeepMemo(() => mergeTheme(theme), [theme])

  // drag
  const [rootRef, set] = useTransform<HTMLDivElement>()

  // collapsible
  const [toggled, setToggle] = useState(!collapsed)

  // this generally happens on first render because the store is initialized in useEffect.
  if (paths.length < 1) return null

  return (
    <ThemeContext.Provider value={themeContext}>
      <StyledRoot ref={rootRef} className={themeContext.className} detached={detached} oneLineLabels={oneLineLabels}>
        {!hideTitleBar && (
          <TitleWithFilter onDrag={set} setFilter={setFilter} toggle={() => setToggle((t) => !t)} toggled={toggled} />
        )}
        <StoreContext.Provider value={store}>
          <TreeWrapper isRoot detached={detached} tree={tree} toggled={toggled} />
        </StoreContext.Provider>
      </StyledRoot>
    </ThemeContext.Provider>
  )
}
