import v8n from 'v8n'
import { NumberSettings } from '../../types/public-api-types'
import { mapArrayToKeys, orderKeys } from '../../utils'
import { InternalNumberSettings } from '../Number/number-plugin'
import { normalizeKeyedNumberInput } from './point-utils'

export type Format = 'array' | 'object'

export type PointArray = number[]
export type PointObj<K extends string> = { [key in K]: number }
export type Point<K extends string, F extends Format = Format> = F extends 'object' ? PointObj<K> : PointArray

export type PointSettings<K extends string> = {
  [key in K]?: NumberSettings
}
export type InternalPointSettings<K extends string> = {
  [key in K]: InternalNumberSettings
} & { format: Format }

// SCHEMA
const number = v8n().number()

export function getPointSchema(keys: string[]) {
  // prettier-ignore
  const pointArray = v8n().array().length(keys.length).every.number()
  const pointObj = v8n().schema(keys.reduce((acc, k) => ({ ...acc, [k]: number }), {}))
  return (o: any) => v8n().passesAnyOf(pointArray, pointObj).test(o)
}

export function getPointType<K extends string>(value: Point<K>): Format {
  return Array.isArray(value) ? 'array' : 'object'
}

function convert<K extends string, F extends Format>(value: Point<K>, format: F, keys?: K[]): Point<K, F> {
  if (getPointType(value) === format) return value as Point<K, F>
  return (format === 'array' ? Object.values(value) : mapArrayToKeys(value as PointArray, keys!)) as Point<K, F>
}

export const sanitizePoint = <K extends string>(value: any, { format }: InternalPointSettings<K>, keys: K[]) => {
  return convert(value, format, keys)
}

export const formatPoint = <K extends string>(value: any, keys: K[]) => convert(value, 'object', keys)

export function normalizePoint<K extends string>(_value: Point<K>, _settings: PointSettings<K> = {}, keys: K[]) {
  const format: Format = Array.isArray(_value) ? 'array' : 'object'
  const value = convert(_value, 'object', keys)
  const { settings } = normalizeKeyedNumberInput(value, _settings as any)

  return {
    value: format === 'array' ? _value : orderKeys(value, keys as any),
    settings: { ...settings, format },
  }
}

export function getPointPlugin<K extends string>(keys: K[]) {
  return {
    schema: getPointSchema(keys),
    normalize: ({ value, ...settings }: any) => normalizePoint(value, settings, keys),
    format: (value: any) => formatPoint(value, keys),
    sanitize: (value: any, settings: InternalPointSettings<K>) => sanitizePoint(value, settings, keys),
  }
}
