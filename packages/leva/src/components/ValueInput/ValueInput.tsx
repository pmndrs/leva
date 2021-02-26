import React, { useCallback } from 'react'
import { useInputContext } from '../../context'
import { parseNumber } from '../../utils'
import { StyledInput, InputContainer, InnerLabel } from './StyledInput'

type ValueInputProps = {
  id: string
  value: string
  children?: React.ReactNode
  type?: 'number' | undefined
  onUpdate: (value: any) => void
  onChange: (value: string) => void
  onKeyDown?: (event: React.KeyboardEvent) => void
} & React.ComponentProps<any>

export function ValueInput({ children, value, onUpdate, onChange, onKeyDown, type, id, ...props }: ValueInputProps) {
  const { path } = useInputContext()
  const inputId = id || path
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
        levaType={type}
        id={inputId}
        type="text"
        spellCheck="false"
        value={value}
        onChange={update(onChange)}
        onBlur={update(onUpdate)}
        onKeyPress={onKeyPress}
        onKeyDown={onKeyDown}
        {...props}
      />
    </InputContainer>
  )
}

export function NumberInput({ children, id, value, onUpdate, onChange }: ValueInputProps) {
  const onKeyDown = useCallback(
    (event: React.KeyboardEvent) => {
      const dir = event.key === 'ArrowUp' ? 1 : event.key === 'ArrowDown' ? -1 : 0
      if (dir) {
        event.preventDefault()
        const step = event.altKey ? 0.1 : event.shiftKey ? 10 : 1
        onUpdate((v: any) => parseNumber(v) + dir * step)
      }
    },
    [onUpdate]
  )
  return (
    <ValueInput id={id} value={value} onUpdate={onUpdate} onChange={onChange} onKeyDown={onKeyDown} type="number">
      {children}
    </ValueInput>
  )
}
