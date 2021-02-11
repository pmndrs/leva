import v8n from 'v8n'
import { NumberSettings } from '../../types'
import { mapArrayToKeys, orderKeys } from '../../utils'
import { InternalNumberSettings, sanitize, validate } from '../Number/number-plugin'
import { normalizeKeyedNumberInput } from './vector-utils'

export type Format = 'array' | 'object'

export type VectorArray = number[]
export type VectorObj<K extends string> = { [key in K]: number }
export type VectorType<K extends string, F extends Format = Format> = F extends 'object' ? VectorObj<K> : VectorArray

type FormatFromValue<Value> = Value extends number[] ? 'array' : Value extends Record<string, number> ? 'object' : never

export type VectorSettings<K extends string> =
  | {
      [key in K]?: NumberSettings
    }
  | NumberSettings

export type InternalVectorSettings<K extends string> = {
  [key in K]: InternalNumberSettings
} & { format: Format }

// SCHEMA
const number = v8n().number()

export function getVectorSchema(keys: string[]) {
  // prettier-ignore
  const VectorArray = v8n().array().length(keys.length).every.number()
  const pointObj = v8n().schema(keys.reduce((acc, k) => Object.assign(acc, { [k]: number }), {}))
  return (o: any) => v8n().passesAnyOf(VectorArray, pointObj).test(o)
}

export function getVectorType<K extends string>(value: VectorType<K>): Format {
  return Array.isArray(value) ? 'array' : 'object'
}

function convert<K extends string, F extends Format>(value: VectorType<K>, format: F, keys?: K[]): VectorType<K, F> {
  if (getVectorType(value) === format) return value as VectorType<K, F>
  return (format === 'array' ? Object.values(value) : mapArrayToKeys(value as VectorArray, keys!)) as VectorType<K, F>
}

export const validateVector = <K extends string>(value: VectorObj<K>) => {
  return Object.values(value).every((v: any) => validate(v))
}

export const sanitizeVector = <K extends string>(
  value: VectorObj<K>,
  settings: InternalVectorSettings<K>,
  keys: K[]
) => {
  const _value = convert(value, 'object', keys)
  for (let key in _value) _value[key] = sanitize(_value[key], settings[key]) as number

  return convert(_value, settings.format, keys)
}

export const formatVector = <K extends string>(value: any, keys: K[]) => {
  return convert(value, 'object', keys)
}

const isNumberSettings = (o?: object) => o && ('step' in o || 'min' in o || 'max' in o)

export function normalizeVector<K extends string, Value extends VectorType<K>>(
  _value: Value,
  _settings: VectorSettings<K> = {},
  keys: K[]
) {
  const format: Format = Array.isArray(_value) ? 'array' : 'object'
  const value = convert(_value, 'object', keys)

  // vector can accept either { value: { x, y }, { x: settings, y: settings } }
  // or { value: { x, y }, { settings } } where settings will apply to both keys
  // merged settings will recognize a unified settings and dispatch it to all keys

  const mergedSettings = isNumberSettings(_settings)
    ? keys.reduce((acc, k) => Object.assign(acc, { [k]: _settings }), {})
    : _settings

  const { settings } = normalizeKeyedNumberInput(value, mergedSettings as any)

  return {
    value: (format === 'array' ? _value : orderKeys(value, keys)) as VectorType<K, FormatFromValue<Value>>,
    settings: { ...settings, format },
  }
}

export function getVectorPlugin<K extends string>(keys: K[]) {
  return {
    schema: getVectorSchema(keys),
    normalize: ({ value, ...settings }: any) => normalizeVector(value, settings, keys),
    validate: validateVector,
    format: (value: any) => formatVector(value, keys),
    sanitize: (value: any, settings: InternalVectorSettings<K>) => sanitizeVector(value, settings, keys),
  }
}
