import React from 'react'
import { useDrag } from 'react-use-gesture'
import { ValueInput } from '../ValueInput'
import { TwixInputProps } from '../../types'
import { NumberSettings } from './number-props'

type NumberProps = TwixInputProps<number, NumberSettings>

const defaultSettings = { step: 1 }

export function Number({ label, formattedValue, value, onUpdate, onChange, settings = defaultSettings }: NumberProps) {
  const bind = useDrag(
    ({ movement: [x], memo = value }) => {
      onUpdate(memo + Math.round(x) * settings.step!)
      return memo
    },
    { threshold: 10, axis: 'x' }
  )
  return (
    <>
      <label {...bind()} style={{ cursor: 'ew-resize', userSelect: 'none' }}>
        {label}
      </label>
      <ValueInput label={label} value={formattedValue} onUpdate={onUpdate} onChange={onChange} />
    </>
  )
}

// Number.whyDidYouRender = {
//   logAllValues: true,
// }
