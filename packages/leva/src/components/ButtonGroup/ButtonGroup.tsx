import React from 'react'
import { Button } from '../Button'
import { Row, Label } from '../UI'
import { StyledButtonGroup } from './StyledButtonGroup'

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
          <Button key={label} onClick={() => onClick()} label={label} />
        ))}
      </StyledButtonGroup>
    </Row>
  )
}
