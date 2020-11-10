import React from 'react'
import { GenericText } from './GenericText'
import { SettingsNumber } from '../../types'

type NumberProps = {
  value: number
  onUpdate: (value: number) => void
} & SettingsNumber

export function Number({ value, onUpdate, ...settings }: NumberProps) {
  return (
    <>
      <GenericText 
        value={value} 
        {...settings} 
        label={"X"}
        onUpdate={onUpdate}
      />
    </>
  )
}
