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
        style={{ transform: `rotate(${toggled ? 0 : -90}deg)` }}
        width="9"
        height="5"
        viewBox="0 0 9 5"
        xmlns="http://www.w3.org/2000/svg">
        <path
          fillRule="evenodd"
          clipRule="evenodd"
          d="M3.82733 4.38848C4.20875 4.73523 4.79125 4.73523 5.17267 4.38848L8.08606 1.73994C8.76239 1.1251 8.32743 0 7.41339 0H1.58661C0.672575 0 0.237605 1.1251 0.913934 1.73994L3.82733 4.38848Z"
        />
      </svg>
      <div>{name}</div>
    </StyledTitle>
  )
}
