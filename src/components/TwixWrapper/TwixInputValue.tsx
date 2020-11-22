import React, { useState, useCallback, useRef } from 'react'
import { store } from '../../store'
import { sanitizers, formatters, validators } from '../../utils/schemas'

import { Settings, Value, ValueInputTypes, TwixInputProps } from '../../types'
import styles from './twixInput.module.css'

type TwixValueInputProps = {
  as: React.ComponentType<TwixInputProps>
  valueKey: string
  path: string
  type: ValueInputTypes
  value: Value
  settings: Settings
}

function sanitize(type: ValueInputTypes, value: any, settings: Settings): Value {
  // @ts-ignore don't understand why this triggers an error
  if (type in sanitizers) return sanitizers[type]!(value, settings)
  else return value
}

function format(type: ValueInputTypes, value: Value, settings: Settings): string {
  // @ts-ignore don't understand why this triggers an error
  if (type in formatters) return formatters[type]!(value, settings)
  else return String(value)
}

function validate(type: ValueInputTypes, value: any, settings: Settings) {
  // @ts-ignore don't understand why this triggers an error
  if (type in validators) return validators[type]!(value, settings)
  else return true
}

export function TwixValueInput({ as: Input, valueKey, path, type, value, settings }: TwixValueInputProps) {
  // the last correct registered value
  const lastCorrectValue = useRef(value)

  // the value shown by the panel
  const [_value, _setValue] = useState(format(type, value, settings))
  const _set = useCallback(value => _setValue(format(type, value, settings)), [type, settings])

  const onUpdate = useCallback(
    value => {
      if (value !== '' && validate(type, value, settings)) {
        value = sanitize(type, value, settings)
        _set(value)
        store.setValueAtPath(path, value)
        lastCorrectValue.current = value
      } else _set(lastCorrectValue.current)
    },
    [path, type, settings, _set]
  )

  return (
    <div className={styles.container}>
      <Input
        label={valueKey}
        formattedValue={_value}
        value={value}
        onChange={_setValue}
        onUpdate={onUpdate}
        {...settings}
      />
    </div>
  )
}
