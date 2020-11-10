import React from 'react'
import { SettingsString } from '../../types'
import { GenericText } from './GenericText'

type StringProps = {
  value: string
  onUpdate: (value: string) => void
} & SettingsString

export function String({ value, onUpdate }: StringProps) {
  return <GenericText type="text" value={value} onUpdate={onUpdate} />
}
