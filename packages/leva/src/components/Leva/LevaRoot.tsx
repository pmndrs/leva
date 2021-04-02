import React, { useMemo, useState } from 'react'
import { buildTree } from './tree'
import { TreeWrapper } from '../Folder'

import { useDeepMemo, useTransform, useVisiblePaths } from '../../hooks'

import { StyledRoot } from './StyledRoot'
import { mergeTheme, LevaCustomTheme } from '../../styles'
import { ThemeContext, StoreContext, PanelSettingsContext } from '../../context'
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
   * If true, the title bar including filters and drag zone will be shown. If set to false, the title bar including filters will be hidden.
   * In case it is set to an object the title bar will be shown and the additional sub-options might be applied.
   */
  titleBar?: boolean | {
    /**
     * Overwrites the default titles (6 dots) if set to a value that is not undefined.
     */
    title?: React.ReactNode;
  };
  /**
   * If true, the copy button will be hidden
   */
  hideCopyButton?: boolean
}


export function LevaRoot({ store, hidden = false, theme, collapsed = false, ...props }: LevaRootProps) {
  const themeContext = useDeepMemo(() => mergeTheme(theme), [theme])
  // collapsible
  const [toggled, setToggle] = useState(!collapsed)
  if (!store || hidden) return null

  return (
    <ThemeContext.Provider value={themeContext}>
      <LevaCore store={store} {...props} toggled={toggled} setToggle={setToggle} rootClass={themeContext.className} />
    </ThemeContext.Provider>
  )
}

type LevaCoreProps = Omit<LevaRootProps, 'theme' | 'hidden' | 'collapsed'> & {
  store: StoreType
  rootClass: string
  toggled: boolean
  setToggle: React.Dispatch<React.SetStateAction<boolean>>
}

const LevaCore = React.memo(
  ({
    store,
    rootClass,
    fill = false,
    flat = false,
    oneLineLabels = false,
    titleBar = true,
    hideCopyButton = false,
    toggled,
    setToggle,
  }: LevaCoreProps) => {
    const paths = useVisiblePaths(store)
    const [filter, setFilter] = useState('')
    const tree = useMemo(() => buildTree(paths, filter), [paths, filter])

    // drag
    const [rootRef, set] = useTransform<HTMLDivElement>()

    // this generally happens on first render because the store is initialized in useEffect.
    const shouldShow = paths.length > 0

    return (
      <PanelSettingsContext.Provider value={{ hideCopyButton }}>
        <StyledRoot
          ref={rootRef}
          className={rootClass}
          fill={fill}
          flat={flat}
          oneLineLabels={oneLineLabels}
          hideTitleBar={!titleBar}
          style={{ display: shouldShow ? 'block' : 'none' }}>
          {titleBar && (
            <TitleWithFilter onDrag={set} setFilter={setFilter} toggle={() => setToggle((t) => !t)} toggled={toggled} title={typeof titleBar === "object" ? titleBar.title : undefined} />
          )}
          {shouldShow && (
            <StoreContext.Provider value={store}>
              <TreeWrapper isRoot fill={fill} flat={flat} tree={tree} toggled={toggled} />
            </StoreContext.Provider>
          )}
        </StyledRoot>
      </PanelSettingsContext.Provider>
    )
  }
)
