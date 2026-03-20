import React from 'react'
import { useStoreContext } from '../..'
import { ButtonInput } from '../../types'
import { Row } from '../UI'
import { StyledButton } from './StyledButton'

type ButtonProps = {
  label: string
} & Omit<ButtonInput, 'type'>

export function Button({ onClick, settings, label }: ButtonProps) {
  const store = useStoreContext()
  const displayLabel = settings.label !== undefined ? settings.label : label
  return (
    <Row>
      <StyledButton disabled={settings.disabled} onClick={() => onClick(store.get)}>
        {displayLabel}
      </StyledButton>
    </Row>
  )
}
