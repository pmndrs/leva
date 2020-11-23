import React from 'react'

type ValueInputProps = {
  label: string
  value: string
  onUpdate: (value: string) => void
  onChange: (value: string) => void
}

export function ValueInput({ value, onUpdate, onChange, ...props }: ValueInputProps) {
  const update = (fn: (value: string) => void) => (event: any) => {
    const _value = event.target.value
    fn(_value)
  }

  const onKeyPress = (e: React.KeyboardEvent) => e.key === 'Enter' && update(onUpdate)(e)

  return (
    <div>
      <input
        type="text"
        {...props}
        value={value}
        onChange={update(onChange)}
        onBlur={update(onUpdate)}
        onKeyPress={onKeyPress}
      />
    </div>
  )
}
