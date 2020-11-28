// @ts-expect-error
import v8n from 'v8n'
import { mapArrayToKeys, orderKeys } from '../../utils'
import { normalizeKeyValue, NumberSettings } from '../Number/number-props'

export type Format = 'array' | 'object'

export type PointArray = number[]
export type PointObj<K extends string> = { [key in keyof K]: number }
export type Point<K extends string, F extends Format = Format> = F extends 'object' ? PointObj<K> : PointArray

export type PointSettings<K extends string> = {
  [key in K]?: NumberSettings
} & { format?: Format }

// SCHEMA
const number = v8n().number()

export function getPointSchema(keys: string[]) {
  // prettier-ignore
  const pointArray = v8n().array().length(keys.length).every.number()
  const pointObj = v8n().schema(keys.reduce((acc, k) => ({ ...acc, [k]: number }), {}))
  return (o: any) =>
    v8n()
      .passesAnyOf(pointArray, pointObj)
      .test(o)
}

export function getPointType<K extends string>(value: Point<K>): Format {
  return Array.isArray(value) ? 'array' : 'object'
}

function convert<K extends string, F extends Format>(value: Point<K>, format: F, keys: K[]): Point<K, F> {
  if (getPointType(value) === format) return value as Point<K, F>
  return (format === 'array' ? Object.values(value) : mapArrayToKeys(value as PointArray, keys)) as Point<K, F>
}

export const sanitizePoint = <K extends string>(v: any, { format }: PointSettings<K>, keys: K[]) =>
  convert(v, format!, keys)
export const formatPoint = <K extends string>(v: any, keys: K[]) => convert(v, 'object', keys)

export function normalizePoint<K extends string>(_value: Point<K>, _settings: PointSettings<K> = {}, keys: K[]) {
  const format = Array.isArray(_value) ? 'array' : 'object'
  const value = convert(_value, 'object', keys)
  const { settings } = normalizeKeyValue(value, _settings)

  return {
    value: format === 'array' ? _value : orderKeys(value, keys as any),
    settings: { ...settings, format },
  }
}
