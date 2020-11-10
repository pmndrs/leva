import React, { useState, useRef } from 'react'

type GenericTextProps = {
  value: string | number
  onUpdate: (e: React.SyntheticEvent) => {}
} & React.DetailedHTMLProps<React.InputHTMLAttributes<HTMLInputElement>, HTMLInputElement>

export function GenericText({ value, onUpdate, ...props }: GenericTextProps) {
  const [_value, _setValue] = useState(value)
  const lastCorrectValue = useRef(value)

  const _onUpdate = (e: React.SyntheticEvent) => {
    // @ts-expect-error
    const eventValue = e.target.value
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
      onChange={e => _setValue(e.target.value)}
      onBlur={_onUpdate}
      onKeyPress={onKeyPress}
    />
  )
}
