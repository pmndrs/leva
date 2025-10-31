import React, { useMemo, useState } from 'react'
import * as RadixTooltip from '@radix-ui/react-tooltip'
import { buildTree } from './tree'
import { TreeWrapper } from '../Folder'

import { useDeepMemo, useTransform, useVisiblePaths } from '../../hooks'

import { StyledRoot } from './StyledRoot'
import { mergeTheme, LevaCustomTheme, globalStyles } from '../../styles'
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
   * If true, will preset the panel even if no paths are defined
   */
  neverHide?: boolean
  /**
   * If true, the panel will fill its parent
   */
  fill?: boolean
  /**
   * If true, the panel will have no border radius nor shadow
   */
  flat?: boolean
  /**
   * If true, the panel will start collapsed.
   * If set to an object, the collapsed state is controlled via the property.
   */
  collapsed?:
    | boolean
    | {
        collapsed: boolean
        onChange: (collapsed: boolean) => void
      }
  /**
   * If true, input labels will stand above the controls
   */
  oneLineLabels?: boolean
  /**
   * If true, the title bar including filters and drag zone will be shown. If set to false, the title bar including filters will be hidden.
   * In case it is set to an object the title bar will be shown and the additional sub-options might be applied.
   */
  titleBar?:
    | boolean
    | {
        /**
         * Overwrites the default title content (6 dots if drag is enabled) if set to a non undefined value.
         */
        title?: React.ReactNode
        /**
         * Toggle whether the leva panel can be dragged around via the title bar.
         */
        drag?: boolean
        /**
         * Toggle whether filtering should be enabled or disabled.
         */
        filter?: boolean
        /**
         * The position(x and y coordinates) of the leva panel.
         */
        position?: { x?: number; y?: number }
        /**
         * The callback is called when the leva panel is dragged.
         */
        onDrag?: (position: { x?: number; y?: number }) => void
        /**
         * The callback is called when the leva panel starts to be dragged.
         */
        onDragStart?: (position: { x?: number; y?: number }) => void
        /**
         * The callback is called when the leva panel stops being dragged.
         */
        onDragEnd?: (position: { x?: number; y?: number }) => void
      }
  /**
   * If true, the copy button will be hidden
   */
  hideCopyButton?: boolean
}

export function LevaRoot({ store, hidden = false, theme, collapsed = false, ...props }: LevaRootProps) {
  const themeContext = useDeepMemo(() => mergeTheme(theme), [theme])
  // collapsible
  const [toggled, setToggle] = useState(!collapsed)

  const computedToggled = typeof collapsed === 'object' ? !collapsed.collapsed : toggled
  const computedSetToggle = useMemo(() => {
    if (typeof collapsed === 'object') {
      return (value: React.SetStateAction<boolean>) => {
        if (typeof value === 'function') {
          collapsed.onChange(!value(!collapsed.collapsed))
        } else {
          collapsed.onChange(!value)
        }
      }
    }
    return setToggle
  }, [collapsed])

  if (!store || hidden) return null

  return (
    <ThemeContext.Provider value={themeContext}>
      <LevaCore
        store={store}
        {...props}
        toggled={computedToggled}
        setToggle={computedSetToggle}
        rootClass={themeContext.className}
      />
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
    neverHide = false,
    oneLineLabels = false,
    titleBar = {
      title: undefined,
      drag: true,
      filter: true,
      position: undefined,
      onDrag: undefined,
      onDragStart: undefined,
      onDragEnd: undefined,
    },
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
    const shouldShow = neverHide || paths.length > 0
    const title = typeof titleBar === 'object' ? titleBar.title || undefined : undefined
    const drag = typeof titleBar === 'object' ? titleBar.drag ?? true : true
    const filterEnabled = typeof titleBar === 'object' ? titleBar.filter ?? true : true
    const position = typeof titleBar === 'object' ? titleBar.position || undefined : undefined
    const onDrag = typeof titleBar === 'object' ? titleBar.onDrag || undefined : undefined
    const onDragStart = typeof titleBar === 'object' ? titleBar.onDragStart || undefined : undefined
    const onDragEnd = typeof titleBar === 'object' ? titleBar.onDragEnd || undefined : undefined

    React.useEffect(() => {
      set({ x: position?.x, y: position?.y })
    }, [position, set])

    globalStyles()

    return (
      <RadixTooltip.Provider>
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
              <TitleWithFilter
                onDrag={(point) => {
                  set(point)
                  onDrag?.(point)
                }}
                onDragStart={(point) => onDragStart?.(point)}
                onDragEnd={(point) => onDragEnd?.(point)}
                setFilter={setFilter}
                toggle={(flag?: boolean) => setToggle((t) => flag ?? !t)}
                toggled={toggled}
                title={title}
                drag={drag}
                filterEnabled={filterEnabled}
                from={position}
              />
            )}
            {shouldShow && (
              <StoreContext.Provider value={store}>
                <TreeWrapper isRoot fill={fill} flat={flat} tree={tree} toggled={toggled} />
              </StoreContext.Provider>
            )}
          </StyledRoot>
        </PanelSettingsContext.Provider>
      </RadixTooltip.Provider>
    )
  }
)
