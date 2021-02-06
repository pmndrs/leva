import React from 'react'
import { useStoreContext } from '../../context'
import { LevaRoot, LevaRootProps } from './LevaRoot'

type LevaPanelProps = Partial<LevaRootProps>

// uses custom store
export function LevaPanel({
  store,
  theme = {},
  fillParent = true,
  collapsed = false,
  oneLineLabels = false,
  hideTitleBar = true,
}: LevaPanelProps) {
  const parentStore = useStoreContext()!
  return (
    <LevaRoot
      store={store || parentStore}
      theme={theme}
      fillParent={fillParent}
      oneLineLabels={oneLineLabels}
      hideTitleBar={hideTitleBar}
      collapsed={collapsed}
    />
  )
}
