import React from 'react'
import styled from '@xstyled/styled-components'
import { Row } from '../styles'

type ButtonProps = {
  name: string
  onClick: () => any
}

const StyledButton = styled.button`
  width: 100%;
`

export function Button({ name, onClick }: ButtonProps) {
  return (
    <Row>
      <StyledButton onClick={() => onClick()}>{name}</StyledButton>
    </Row>
  )
}
