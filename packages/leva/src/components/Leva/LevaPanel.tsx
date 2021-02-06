import React from 'react'
import { useStoreContext } from '../../context'
import { LevaRoot, LevaRootProps } from './LevaRoot'

type LevaPanelProps = Partial<LevaRootProps>

// uses custom store
export function LevaPanel({
  store,
  theme = {},
  detached = false,
  collapsed = false,
  oneLineLabels = false,
  hideTitleBar,
}: LevaPanelProps) {
  const parentStore = useStoreContext()!
  return (
    <LevaRoot
      store={store || parentStore}
      theme={theme}
      detached={detached}
      oneLineLabels={oneLineLabels}
      hideTitleBar={hideTitleBar ?? !detached}
      collapsed={collapsed}
    />
  )
}
