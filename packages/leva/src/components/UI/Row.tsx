import React from 'react'
import { StyledRow, StyledInputRow } from './StyledUI'

type RowProps = React.ComponentProps<any> & { input?: boolean }

export function Row({ input, ...props }: RowProps) {
  if (input) return <StyledInputRow {...props} />
  return <StyledRow {...props} />
}
