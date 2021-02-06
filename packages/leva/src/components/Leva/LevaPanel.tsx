import React from 'react'
import { LevaRoot, LevaRootProps } from './LevaRoot'

type LevaPanelProps = Partial<LevaRootProps> & { store: LevaRootProps['store'] }

// uses custom store
export function LevaPanel({
  store,
  theme = {},
  fillParent = true,
  collapsed = false,
  oneLineLabels = false,
  hideTitleBar = true,
}: LevaPanelProps) {
  return (
    <LevaRoot
      store={store}
      theme={theme}
      fillParent={fillParent}
      oneLineLabels={oneLineLabels}
      hideTitleBar={hideTitleBar}
      collapsed={collapsed}
    />
  )
}
