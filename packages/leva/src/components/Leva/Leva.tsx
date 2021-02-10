import React, { useEffect } from 'react'
import ReactDOM from 'react-dom'
import { globalStore } from '../../store'
import { LevaRoot, LevaRootProps } from './LevaRoot'

let rootInitialized = false

type LevaProps = Omit<Partial<LevaRootProps>, 'store'>

// uses global store
export function Leva({
  theme = {},
  detached = true,
  collapsed = false,
  oneLineLabels = false,
  hideTitleBar = false,
}: LevaProps) {
  useEffect(() => {
    rootInitialized = true
  }, [])

  return (
    <LevaRoot
      store={globalStore}
      theme={theme}
      detached={detached}
      oneLineLabels={oneLineLabels}
      hideTitleBar={hideTitleBar}
      collapsed={collapsed}
    />
  )
}

export function useRenderRoot() {
  useEffect(() => {
    if (!rootInitialized) {
      const rootEl = document.createElement('div')
      if (document.body) {
        document.body.appendChild(rootEl)
        ReactDOM.render(<Leva />, rootEl)
      }
      rootInitialized = true
    }
  }, [])
}
