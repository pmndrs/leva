import React, { useCallback } from 'react'
import { StyledInput, InputContainer, InnerLabel } from './StyledInput'

type ValueInputProps = {
  value: string
  children?: React.ReactNode
  isNumber?: boolean
  onUpdate: (value: any) => void
  onChange: (value: string) => void
  onKeyDown?: (event: React.KeyboardEvent) => void
} & React.ComponentProps<typeof StyledInput>

export function ValueInput({
  children,
  value,
  onUpdate,
  onChange,
  onKeyDown,
  isNumber = false,
  ...props
}: ValueInputProps) {
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
        isNumber={isNumber}
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

export function NumberInput({ children, value, onUpdate, onChange }: ValueInputProps) {
  const onKeyDown = useCallback(
    (event: React.KeyboardEvent) => {
      const dir = event.key === 'ArrowUp' ? 1 : event.key === 'ArrowDown' ? -1 : 0
      if (dir) {
        event.preventDefault()
        const step = event.altKey ? 0.1 : event.shiftKey ? 10 : 1
        onUpdate((v: number) => v + dir * step)
      }
    },
    [onUpdate]
  )
  return (
    <ValueInput value={value} onUpdate={onUpdate} onChange={onChange} onKeyDown={onKeyDown} isNumber>
      {children}
    </ValueInput>
  )
}
