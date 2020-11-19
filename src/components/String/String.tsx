import React from 'react'
import { ValueInput } from '../ValueInput'
import { StringSettings } from '../../types'

type StringProps = {
  value: string
  onUpdate: (value: string) => void
} & StringSettings

export function String({ value, onUpdate }: StringProps) {
  return <ValueInput type="text" value={value} onUpdate={onUpdate} />
}
