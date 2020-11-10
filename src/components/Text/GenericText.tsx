import React, { useState, useRef } from 'react'

type GenericTextProps<T extends number | string> = {
  value: T
  onUpdate: (value: T) => void
} & React.DetailedHTMLProps<React.InputHTMLAttributes<HTMLInputElement>, HTMLInputElement>

export function GenericText<T extends number | string>({ value, onUpdate, ...props }: GenericTextProps<T>) {
  const [_value, _setValue] = useState(value)
  const lastCorrectValue = useRef(value)

  const _onUpdate = (e: React.SyntheticEvent) => {
    // @ts-expect-error
    const eventValue: T = e.target.value
    if (eventValue !== '') {
      onUpdate(eventValue)
      lastCorrectValue.current = eventValue
    } else _setValue(lastCorrectValue.current)
  }
  const onKeyPress = (e: React.KeyboardEvent) => e.key === 'Enter' && _onUpdate(e)

  return (
    <input
      {...props}
      value={_value}
      onChange={e => _setValue(e.target.value as T)}
      onBlur={_onUpdate}
      onKeyPress={onKeyPress}
    />
  )
}
