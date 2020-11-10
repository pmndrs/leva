import React from 'react'
import { SettingsString } from '../../types'
import { GenericText } from './GenericText'

type StringProps = {
  value: string
  onUpdate: (e: React.SyntheticEvent) => {}
} & SettingsString

export function String({ value, onUpdate }: StringProps) {
  return <GenericText value={value} onUpdate={onUpdate} />
}
