import React, { useEffect } from 'react'
import ReactDOM from 'react-dom'
import { globalStore } from '../../store'
import { LevaRoot, LevaRootProps } from './LevaRoot'

let rootInitialized = false

type LevaProps = Omit<Partial<LevaRootProps>, 'store'>

// uses global store
export function Leva({
  theme,
  detached = true,
  collapsed = false,
  oneLineLabels = false,
  hideTitleBar = false,
  hidden = false,
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
      hidden={hidden}
    />
  )
}

/**
 * This hook is used by Leva useControls, and ensures that we spawn a Leva Panel
 * without the user having to put it into the component tree. This should only
 * happen when using the global store
 * @param isGlobalPanel
 */
export function useRenderRoot(isGlobalPanel: boolean) {
  useEffect(() => {
    if (isGlobalPanel && !rootInitialized) {
      const rootEl = document.createElement('div')
      if (document.body) {
        document.body.appendChild(rootEl)
        ReactDOM.render(<Leva />, rootEl)
      }
      rootInitialized = true
    }
  }, [isGlobalPanel])
}
