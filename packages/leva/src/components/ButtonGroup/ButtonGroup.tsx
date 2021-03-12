import React from 'react'
import { Row, Label } from '../UI'
import { StyledButtonGroup } from './StyledButtonGroup'
import { StyledButtonGroupButton } from './StyledButtonGroupButton'

type ButtonGroupProps = {
  label: string
  opts: {
    [label: string]: () => void
  }
}

export function ButtonGroup({ label, opts }: ButtonGroupProps) {
  return (
    <Row input={true}>
      <Label>{label}</Label>
      <StyledButtonGroup>
        {Object.entries(opts).map(([label, onClick]) => (
          <StyledButtonGroupButton key={label} onClick={() => onClick()}>
            {label}
          </StyledButtonGroupButton>
        ))}
      </StyledButtonGroup>
    </Row>
  )
}
