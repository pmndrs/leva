import React from 'react'
import { GenericText } from './GenericText'
import { NumberSettings } from '../../types'

type NumberProps = {
  value: number
  onUpdate: (value: number) => void
} & NumberSettings

export function Number({ value, onUpdate, ...settings }: NumberProps) {
  return <GenericText type="number" value={value} {...settings} onUpdate={onUpdate} />
}
