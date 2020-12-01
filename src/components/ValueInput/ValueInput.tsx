import React from 'react'
import { StyledInput, InputContainer, InnerLabel } from './StyledInput'

type ValueInputProps = {
  value: string
  children?: React.ReactNode
  onUpdate: (value: string) => void
  onChange: (value: string) => void
} & React.ComponentProps<typeof StyledInput>

export function ValueInput({ children, value, onUpdate, onChange, ...props }: ValueInputProps) {
  const update = (fn: (value: string) => void) => (event: any) => {
    const _value = event.target.value
    fn(_value)
  }

  const onKeyPress = (e: React.KeyboardEvent) => e.key === 'Enter' && update(onUpdate)(e)

  return (
    <InputContainer>
      {children && <InnerLabel>{children}</InnerLabel>}
      <StyledInput
        type="text"
        {...props}
        spellCheck="false"
        value={value}
        onChange={update(onChange)}
        onBlur={update(onUpdate)}
        onKeyPress={onKeyPress}
      />
    </InputContainer>
  )
}
