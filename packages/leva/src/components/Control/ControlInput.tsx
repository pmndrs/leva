import React, { useCallback } from 'react'
import { useLevaUpdate } from '../../hooks/useLevaUpdate'
import { store } from '../../store'
import { LevaInputProps } from '../../types'

type ControlInputProps<V, Settings extends object> = {
  as: React.ComponentType<LevaInputProps<V, Settings>>
  valueKey: string
  path: string
  type: string
  value: V
  settings: Settings
}

export function ControlInput<V, Settings extends object>({
  as: Input,
  valueKey,
  path,
  type,
  value,
  settings,
}: ControlInputProps<V, Settings>) {
  const set = useCallback((value) => store.setValueAtPath(path, value), [path])

  const { displayValue, onChange, onUpdate } = useLevaUpdate({ type, value, settings, set })

  return <Input {...{ valueKey, label: valueKey, displayValue, value, onChange, onUpdate, settings }} />
}
