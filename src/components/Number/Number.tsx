import React from 'react'
import { ValueInput } from '../ValueInput'
import { NumberSettings } from '../../types'

type NumberProps = {
  value: number
  onUpdate: (value: number) => void
} & NumberSettings

export function Number({ value, onUpdate, ...settings }: NumberProps) {
  return <ValueInput type="number" value={value} {...settings} dragEnabled onUpdate={onUpdate} />
}
