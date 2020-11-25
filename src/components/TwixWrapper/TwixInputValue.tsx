import React, { useCallback } from 'react'
import { useTwixUpdate } from '../../hooks/useTwixUpdate'
import { store } from '../../store'

import { TwixInputProps } from '../../types'

type TwixValueInputProps<V, Settings extends object> = {
  as: React.ComponentType<TwixInputProps<V, Settings>>
  valueKey: string
  path: string
  type: string
  value: V
  settings: Settings
}

export function TwixValueInput<V, Settings extends object>({
  as: Input,
  valueKey,
  path,
  type,
  value,
  settings,
}: TwixValueInputProps<V, Settings>) {
  const set = useCallback(value => store.setValueAtPath(path, value), [path])

  const { formattedValue, onChange, onUpdate } = useTwixUpdate({ type, value, settings, set })

  return (
    <Input
      label={valueKey}
      formattedValue={formattedValue}
      value={value}
      onChange={onChange}
      onUpdate={onUpdate}
      settings={settings}
    />
  )
}
