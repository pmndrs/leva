import React from 'react'
import { useLevaUpdate } from '../../hooks'
import { sanitizeValue } from '../../utils'
import { NumberInner } from '../Number'
import { InternalNumberSettings } from '../Number/number-plugin'

type CoordinateValue = Record<string, number>

type CoordinateProps<T extends CoordinateValue> = {
  value: T
  settings: InternalNumberSettings
  valueKey: keyof T
  onUpdate: (value: T) => void
}

function Coordinate<T extends CoordinateValue>({ value, valueKey, settings, onUpdate }: CoordinateProps<T>) {
  const args = { type: 'NUMBER', value: value[valueKey], settings }

  const set = (newValue: any) => onUpdate({ ...value, [valueKey]: sanitizeValue(args, newValue) })

  const number = useLevaUpdate({ ...args, set })

  return (
    <NumberInner
      label={valueKey as string}
      value={value[valueKey]}
      displayValue={number.displayValue}
      onUpdate={number.onUpdate}
      onChange={number.onChange}
      settings={settings}
    />
  )
}

type VectorSettings<T extends CoordinateValue> = { [key in keyof T]: InternalNumberSettings }

type VectorProps<T extends CoordinateValue> = {
  value: T
  settings: VectorSettings<T>
  onUpdate: (value: T) => void
}

export function Vector<T extends CoordinateValue>({ value, onUpdate, settings }: VectorProps<T>) {
  return (
    <>
      {Object.keys(value).map((key) => (
        <Coordinate key={key} valueKey={key} value={value} settings={settings[key]} onUpdate={onUpdate} />
      ))}
    </>
  )
}
