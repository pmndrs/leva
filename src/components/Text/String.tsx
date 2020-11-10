import React from 'react'
import { StringSettings } from '../../types'
import { GenericText } from './GenericText'

type StringProps = {
  value: string
  onUpdate: (value: string) => void
} & StringSettings

export function String({ value, onUpdate }: StringProps) {
  return <GenericText type="text" value={value} onUpdate={onUpdate} />
}
