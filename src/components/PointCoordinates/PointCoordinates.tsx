import React, { useCallback } from 'react'
import { useTwixUpdate } from '../../hooks'
import { NumberInner } from '../Number'
import { InternalNumberSettings } from '../Number/number-plugin'

type CoordinateValue = Record<string, number>

type CoordinateProps<T extends CoordinateValue> = {
  value: T
  settings: InternalNumberSettings
  valueKey: keyof T
  onUpdate: (value: T) => void
}

export function Coordinate<T extends CoordinateValue>({ value, valueKey, settings, onUpdate }: CoordinateProps<T>) {
  const set = useCallback((v: number) => onUpdate({ ...value, [valueKey]: v }), [onUpdate, value, valueKey])
  const number = useTwixUpdate({ type: 'NUMBER', value: value[valueKey], set, settings })

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

type PointCoordinatesSettings<T extends CoordinateValue> = { [key in keyof T]: InternalNumberSettings }

type PointCoordinatesProps<T extends CoordinateValue> = {
  value: T
  settings: PointCoordinatesSettings<T>
  onUpdate: (value: T) => void
}

export function PointCoordinates<T extends CoordinateValue>({ value, onUpdate, settings }: PointCoordinatesProps<T>) {
  return (
    <>
      {Object.keys(value).map(key => (
        <Coordinate key={key} valueKey={key} value={value} settings={settings[key]} onUpdate={onUpdate} />
      ))}
    </>
  )
}
