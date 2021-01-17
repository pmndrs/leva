import React from 'react'
import { Row } from '../UI'
import { StyledButton } from './StyledButton'

type ButtonProps = {
  valueKey: string
  onClick: () => any
}

export function Button({ onClick, valueKey }: ButtonProps) {
  return (
    <Row>
      <StyledButton onClick={() => onClick()}>{valueKey}</StyledButton>
    </Row>
  )
}
