import React, { useContext } from 'react'
import * as P from '@radix-ui/react-portal'
import { ThemeContext } from '../../context'
export { Overlay } from './StyledUI'

// @ts-ignore
export function Portal({ children }) {
  const { className } = useContext(ThemeContext)!
  const rootEl = document.getElementById('leva-styled-root')
  return (
    <P.Root className={className} container={rootEl}>
      {children}
    </P.Root>
  )
}
