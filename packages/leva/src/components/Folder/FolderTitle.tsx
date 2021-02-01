import React from 'react'
import { StyledTitle } from './StyledFolder'

export type FolderTitleProps = {
  name?: string
  toggled: boolean
  toggle: () => void
}

export function FolderTitle({ toggle, toggled, name }: FolderTitleProps) {
  return (
    <StyledTitle onClick={() => toggle()}>
      <svg
        width="9"
        height="5"
        viewBox="0 0 9 5"
        xmlns="http://www.w3.org/2000/svg"
        style={{ transform: `rotate(${toggled ? 0 : -90}deg)` }}>
        <path d="M3.8 4.4c.4.3 1 .3 1.4 0L8 1.7A1 1 0 007.4 0H1.6a1 1 0 00-.7 1.7l3 2.7z" />
      </svg>
      <div>{name}</div>
    </StyledTitle>
  )
}
