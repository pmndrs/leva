import React, { useState, useCallback, useRef } from 'react'
import { store } from '../../store'
import { log, TwixErrors } from '../../utils/log'
import { sanitizers, formatters, validators } from '../../utils/schemas'
import allInputs from './allInputs'

import { Settings, Value, ValueInputTypes } from '../../types'
import styles from './twixInput.module.css'

type TwixInputProps = { valueKey: string; path: string; type: ValueInputTypes; value: Value; settings: Settings }

function sanitize(type: ValueInputTypes, value: any, settings: Settings) {
  // @ts-ignore don't understand why this triggers an error
  if (type in sanitizers) return sanitizers[type]!(value, settings)
  else return value
}

function format(type: ValueInputTypes, value: Value, settings: Settings) {
  // @ts-ignore don't understand why this triggers an error
  if (type in formatters) return formatters[type]!(value, settings)
  else return value
}

function validate(type: ValueInputTypes, value: Value, settings: Settings) {
  // @ts-ignore don't understand why this triggers an error
  if (type in validators) return validators[type]!(value, settings)
  else return true
}

export function TwixInput({ valueKey, path, type, value, settings }: TwixInputProps) {
  const lastCorrectValue = useRef(value)
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

  // @ts-expect-error
  const InputForType = allInputs[type]

  if (!InputForType) {
    log(TwixErrors.UNSUPPORTED_INPUT, type, path)
    return null
  }

  return (
    <div className={styles.container}>
      <InputForType
        label={valueKey}
        formattedValue={_value}
        value={value}
        {...settings}
        onChange={_setValue}
        onUpdate={onUpdate}
      />
    </div>
  )
}
