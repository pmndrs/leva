import React, { useMemo, useState } from 'react'

import { StoreType } from '../../store'
import { buildTree } from './tree'
import { TreeWrapper } from '../Folder'

import { useDeepMemo, useTransform, useVisiblePaths } from '../../hooks'

import { StyledRoot } from './StyledLeva'
import { mergeTheme, LevaCustomTheme } from '../../styles'
import { ThemeContext, StoreContext } from '../../context'
import { TitleWithFilter } from './Filter'

export type LevaRootProps = {
  theme?: LevaCustomTheme
  store?: StoreType | null
  hidden?: boolean
  detached: boolean
  collapsed: boolean
  oneLineLabels: boolean
  hideTitleBar: boolean
}

export function LevaRoot({ store, hidden = false, theme, ...props }: LevaRootProps) {
  const themeContext = useDeepMemo(() => mergeTheme(theme), [theme])
  if (!store || hidden) return null

  return (
    <ThemeContext.Provider value={themeContext}>
      <LevaCore store={store} {...props} rootClass={themeContext.className} />
    </ThemeContext.Provider>
  )
}

type LevaCoreProps = Omit<LevaRootProps, 'theme'> & { store: StoreType; rootClass: string }

const LevaCore = React.memo(({ store, rootClass, detached, collapsed, oneLineLabels, hideTitleBar }: LevaCoreProps) => {
  const paths = useVisiblePaths(store)
  const [filter, setFilter] = useState('')
  const tree = useMemo(() => buildTree(paths, filter), [paths, filter])

  // drag
  const [rootRef, set] = useTransform<HTMLDivElement>()

  // collapsible
  const [toggled, setToggle] = useState(!collapsed)

  // this generally happens on first render because the store is initialized in useEffect.
  const shouldShow = paths.length > 0

  return (
    <StyledRoot
      ref={rootRef}
      className={rootClass}
      detached={detached}
      oneLineLabels={oneLineLabels}
      style={{ display: shouldShow ? 'block' : 'none' }}>
      {!hideTitleBar && (
        <TitleWithFilter onDrag={set} setFilter={setFilter} toggle={() => setToggle((t) => !t)} toggled={toggled} />
      )}
      {shouldShow && (
        <StoreContext.Provider value={store}>
          <TreeWrapper isRoot detached={detached} tree={tree} toggled={toggled} />
        </StoreContext.Provider>
      )}
    </StyledRoot>
  )
})
