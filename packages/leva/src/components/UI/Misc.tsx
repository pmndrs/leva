import React from 'react'

type OverlayProps = { onClick: () => void }

// TODO should we rather use something like use-onclickoutside?

export function Overlay({ onClick }: OverlayProps) {
  return <div style={{ position: 'fixed', top: 0, bottom: 0, right: 0, left: 0, zIndex: 1000 }} onClick={onClick} />
}
