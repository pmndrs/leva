import React, { useCallback } from 'react'
import { useTwixUpdate } from '../../hooks/useTwixUpdate'
import { store } from '../../store'

import { Settings, Value, TwixInputProps } from '../../types'
import styles from './twixInput.module.css'

type TwixValueInputProps = {
  as: React.ComponentType<TwixInputProps>
  valueKey: string
  path: string
  type: string
  value: Value
  settings: Settings
}

export function TwixValueInput({ as: Input, valueKey, path, type, value, settings }: TwixValueInputProps) {
  const set = useCallback(value => store.setValueAtPath(path, value), [path])

  const [formattedValue, onChange, onUpdate] = useTwixUpdate({ type, value, settings, set })

  return (
    <div className={styles.container}>
      <Input
        label={valueKey}
        formattedValue={formattedValue}
        value={value}
        onChange={onChange}
        onUpdate={onUpdate}
        {...settings}
      />
    </div>
  )
}
