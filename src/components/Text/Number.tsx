import React from 'react'
import { GenericText } from './GenericText'
import { SettingsNumber } from '../../types'

type NumberProps = {
  value: number
  onUpdate: (e: React.SyntheticEvent) => {}
} & SettingsNumber

export function Number({ value, onUpdate, ...settings }: NumberProps) {
  return <GenericText type="number" value={value} {...settings} onUpdate={onUpdate} />
}
