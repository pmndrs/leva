import React from 'react'
import { StyledLabel } from './StyledUI'

export { Row } from './StyledUI'

type LabelProps = React.ComponentProps<typeof StyledLabel>

export function Label(props: LabelProps) {
  return <StyledLabel {...props} />
}

type OverlayProps = { onClick: () => void }

// TODO should we rather use something like use-onclickoutside?

export function Overlay({ onClick }: OverlayProps) {
  return <div style={{ position: 'fixed', top: 0, bottom: 0, right: 0, left: 0 }} onClick={onClick} />
}
