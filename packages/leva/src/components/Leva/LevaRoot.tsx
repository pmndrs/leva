import React, { useMemo, useState } from 'react'
import { buildTree } from './tree'
import { TreeWrapper } from '../Folder'

import { useDeepMemo, useTransform, useVisiblePaths } from '../../hooks'

import { StyledRoot } from './StyledLeva'
import { mergeTheme, LevaCustomTheme } from '../../styles'
import { ThemeContext, StoreContext } from '../../context'
import { TitleWithFilter } from './Filter'
import { StoreType } from '../../types'

export type LevaRootProps = {
  /**
   * Theme with Stitches tokens
   */
  theme?: LevaCustomTheme
  /**
   * The store to be used by the panel
   */
  store?: StoreType | null
  /**
   * If true, won't display the panel
   */
  hidden?: boolean
  /**
   * If true, the panel will fill its parent
   */
  fill?: boolean
  /**
   * If true, the panel will have no border radius nor shadow
   */
  flat?: boolean
  /**
   * If true, the panel will start collapsed
   */
  collapsed?: boolean
  /**
   * If true, input labels will stand above the controls
   */
  oneLineLabels?: boolean
  /**
   * If true, the title bar including filters and drag zone will be hidden
   */
  hideTitleBar?: boolean
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

type LevaCoreProps = Omit<LevaRootProps, 'theme' | 'hidden'> & { store: StoreType; rootClass: string }

const LevaCore = React.memo(
  ({
    store,
    rootClass,
    fill = false,
    flat = false,
    collapsed = false,
    oneLineLabels = false,
    hideTitleBar = false,
  }: LevaCoreProps) => {
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
        fill={fill}
        flat={flat}
        oneLineLabels={oneLineLabels}
        style={{ display: shouldShow ? 'block' : 'none' }}>
        {!hideTitleBar && (
          <TitleWithFilter onDrag={set} setFilter={setFilter} toggle={() => setToggle((t) => !t)} toggled={toggled} />
        )}
        {shouldShow && (
          <StoreContext.Provider value={store}>
            <TreeWrapper isRoot fill={fill} flat={flat} tree={tree} toggled={toggled} />
          </StoreContext.Provider>
        )}
      </StyledRoot>
    )
  }
)
