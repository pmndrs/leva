import React from 'react'
import styles from './input.module.css'

type ValueInputProps = {
  label: string
  value: string
  onUpdate: (value: string) => void
  onChange: (value: string) => void
}

export function ValueInput({ value, onUpdate, onChange, ...props }: ValueInputProps) {
  const onKeyPress = (e: React.KeyboardEvent) => e.key === 'Enter' && onUpdate((e.target as any).value)

  return (
    <div className={styles.inputContainer}>
      <input
        type="text"
        {...props}
        className={styles.input}
        value={value}
        onChange={e => onChange(e.target.value)}
        onBlur={e => onUpdate(e.target.value)}
        onKeyPress={onKeyPress}
      />
    </div>
  )
}
