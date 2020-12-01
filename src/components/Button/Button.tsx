import React from 'react'
import { Row } from '../styles'
import { StyledButton } from './StyledButton'

type ButtonProps = {
  name: string
  onClick: () => any
}

export function Button({ name, onClick }: ButtonProps) {
  return (
    <Row>
      <StyledButton onClick={() => onClick()}>{name}</StyledButton>
    </Row>
  )
}
