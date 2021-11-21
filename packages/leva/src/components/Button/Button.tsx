import React from 'react'
import { ButtonInput } from '../../types'
import { Row } from '../UI'
import { StyledButton } from './StyledButton'

type ButtonProps = {
  label: string
} & Omit<ButtonInput, 'type'>

export function Button({ onClick, settings, label }: ButtonProps) {
  return (
    <Row>
      <StyledButton disabled={settings.disabled} onClick={() => onClick()}>
        {label}
      </StyledButton>
    </Row>
  )
}
