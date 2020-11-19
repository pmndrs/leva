import React, { useState, useRef } from 'react'
import { useDrag } from 'react-use-gesture'
import styles from './text.module.css'

type GenericTextProps<T extends number | string> = {
  value: T
  dragEnabled: boolean
  onUpdate: (value: T) => void
} & React.DetailedHTMLProps<React.InputHTMLAttributes<HTMLInputElement>, HTMLInputElement>

export function GenericText<T extends number | string>({
  value,
  onUpdate,
  dragEnabled,
  ...props
}: GenericTextProps<T>) {
  const [_value, _setValue] = useState(value)
  const lastCorrectValue = useRef(value)
  const ref = useRef<HTMLInputElement>(null)
  const hasFocus = () => ref.current === document.activeElement

  const bind = useDrag(
    ({ event, movement: [x], memo = ~~value }) => {
      if (event.type === 'pointerdown' && !hasFocus()) event.preventDefault()
      else if (event.type === 'pointerup' && !hasFocus() && !x) ref.current!.focus()
      else if (hasFocus()) return
      else {
        const newValue = (memo + x / 10) as T
        lastCorrectValue.current = newValue
        _setValue(newValue)
        onUpdate(newValue)
        return memo
      }
    },
    { enabled: dragEnabled, threshold: 10, triggerAllEvents: true, axis: 'x' }
  )

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
    <div className={styles.inputContainer}>
      <input
        ref={ref}
        {...bind()}
        {...props}
        className={styles.input}
        value={_value}
        onChange={e => _setValue(e.target.value as T)}
        onBlur={_onUpdate}
        onKeyPress={onKeyPress}
      />
    </div>
  )
}
