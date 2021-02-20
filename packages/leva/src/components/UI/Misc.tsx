import React, { useContext } from 'react'
// @ts-expect-error
import { Portal as P } from 'react-portal'
import { ThemeContext } from '../../context'

export { Overlay } from './StyledUI'

// @ts-ignore
export function Portal({ children }) {
  const { className } = useContext(ThemeContext)!
  return (
    <P>
      <div className={className}>{children}</div>
    </P>
  )
}
