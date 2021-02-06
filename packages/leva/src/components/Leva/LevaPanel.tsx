import React from 'react'
import { useStoreContext } from '../../context'
import { LevaRoot, LevaRootProps } from './LevaRoot'

type LevaPanelProps = Partial<LevaRootProps>

// uses custom store
export function LevaPanel({
  store,
  theme = {},
  detatched = false,
  collapsed = false,
  oneLineLabels = false,
  hideTitleBar,
}: LevaPanelProps) {
  const parentStore = useStoreContext()!
  return (
    <LevaRoot
      store={store || parentStore}
      theme={theme}
      detatched={detatched}
      oneLineLabels={oneLineLabels}
      hideTitleBar={hideTitleBar ?? !detatched}
      collapsed={collapsed}
    />
  )
}
