// @ts-expect-error
import v8n from 'v8n'
import { ValueInputWithSettings } from '../../types'
import { clamp, orderKeys } from '../../utils'
import { InternalNumberSettings, normalizeKeyValue } from '../Number/number-plugin'

type Interval = { min: number; max: number; bounds: [number, number] }
export type InternalInterval = { min: number; max: number }

export type InternalIntervalSettings = {
  bounds: [number, number]
  min: InternalNumberSettings
  max: InternalNumberSettings
}

type IntervalInput = ValueInputWithSettings<Interval>

const number = v8n().number()
export const schema = (o: any) =>
  v8n()
    .schema({ min: number, max: number })
    .test(o)

export const sanitize = ({ min, max }: InternalInterval, { bounds: [MIN, MAX] }: InternalIntervalSettings) => ({
  min: clamp(Number(min), MIN, Math.max(MIN, max)),
  max: clamp(Number(max), Math.min(MAX, min), MAX),
})

export const normalize = ({ value: { bounds, ..._value } }: IntervalInput) => {
  const boundsSettings = { min: bounds[0], max: bounds[1] }
  const _settings = { min: boundsSettings, max: boundsSettings }
  const { value, settings } = normalizeKeyValue(orderKeys(_value, ['min', 'max']), _settings)
  return { value, settings: { ...settings, bounds } }
}
