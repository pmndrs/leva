import React from 'react'
import { StyledTitle } from './StyledFolder'
import { Chevron } from '../UI'

export type FolderTitleProps = {
  name?: string
  toggled: boolean
  toggle: () => void
}

export function FolderTitle({ toggle, toggled, name }: FolderTitleProps) {
  return (
    <StyledTitle onClick={() => toggle()}>
      <Chevron toggled={toggled} />
      <div>{name}</div>
    </StyledTitle>
  )
}
