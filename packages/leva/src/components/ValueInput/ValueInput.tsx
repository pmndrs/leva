import React, { useCallback } from 'react'
import { StyledInput, InputContainer, InnerLabel } from './StyledInput'

type ValueInputProps = {
  value: string
  children?: React.ReactNode
  onUpdate: (value: string) => void
  onChange: (value: string) => void
  onKeyDown?: (event: React.KeyboardEvent) => void
} & React.ComponentProps<typeof StyledInput>

export function ValueInput({ children, value, onUpdate, onChange, onKeyDown, ...props }: ValueInputProps) {
  const update = useCallback(
    (fn: (value: string) => void) => (event: any) => {
      const _value = event.currentTarget.value
      fn(_value)
    },
    []
  )

  const onKeyPress = useCallback(
    (e: React.KeyboardEvent<HTMLInputElement>) => {
      if (e.key === 'Enter') {
        update(onUpdate)(e)
        // e.currentTarget.blur()
      }
    },
    [update, onUpdate]
  )

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
        onKeyDown={onKeyDown}
      />
    </InputContainer>
  )
}
