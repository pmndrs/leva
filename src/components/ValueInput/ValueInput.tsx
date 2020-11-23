import React from 'react'
import styles from './input.module.css'

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
    <div className={styles.inputContainer}>
      <input
        type="text"
        {...props}
        className={styles.input}
        value={value}
        onChange={update(onChange)}
        onBlur={update(onUpdate)}
        onKeyPress={onKeyPress}
      />
    </div>
  )
}
