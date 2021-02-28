import React from 'react'
import { useInputContext } from '../../context'
import { styled } from '../../styles'
import { useValue } from '../../hooks'
import { sanitizeValue } from '../../utils'
import { Number } from '../Number'
import { InternalNumberSettings } from '../Number/number-plugin'

type CoordinateValue = Record<string, number>

type CoordinateProps<T extends CoordinateValue> = {
  id?: string
  value: T
  settings: InternalNumberSettings
  valueKey: keyof T
  onUpdate: (value: any) => void
}

function Coordinate<T extends CoordinateValue>({ value, id, valueKey, settings, onUpdate }: CoordinateProps<T>) {
  const args = { type: 'NUMBER', value: value[valueKey], settings }
  const setValue = (newValue: any) => onUpdate({ [valueKey]: sanitizeValue(args, newValue) })

  const number = useValue({ ...args, setValue })

  return (
    <Number
      id={id}
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

export const Container = styled('div', {
  display: 'grid',
  columnGap: '$colGap',
  gridAutoFlow: 'column dense',
})

export function Vector<T extends CoordinateValue>({ value, onUpdate, settings }: VectorProps<T>) {
  const { path } = useInputContext()
  return (
    <Container>
      {Object.keys(value).map((key, i) => (
        <Coordinate
          id={i === 0 ? path : `${path}.${key}`}
          key={key}
          valueKey={key}
          value={value}
          settings={settings[key]}
          onUpdate={onUpdate}
        />
      ))}
    </Container>
  )
}
