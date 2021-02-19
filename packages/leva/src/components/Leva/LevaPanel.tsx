import React from 'react'
import { useStoreContext } from '../../context'
import { LevaRoot, LevaRootProps } from './LevaRoot'

type LevaPanelProps = Partial<LevaRootProps>

// uses custom store
export function LevaPanel({
  store,
  theme,
  detached = false,
  collapsed = false,
  oneLineLabels = false,
  hideTitleBar,
  hidden = false,
}: LevaPanelProps) {
  const parentStore = useStoreContext()
  const _store = store === undefined ? parentStore : store
  return (
    <LevaRoot
      store={_store}
      theme={theme}
      detached={detached}
      oneLineLabels={oneLineLabels}
      hideTitleBar={hideTitleBar ?? !detached}
      collapsed={collapsed}
      hidden={hidden}
    />
  )
}
