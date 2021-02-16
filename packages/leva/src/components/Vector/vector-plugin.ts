import v8n from 'v8n'
import { NumberSettings } from '../../types'
import { mapArrayToKeys } from '../../utils'
import { InternalNumberSettings, sanitize, validate } from '../Number/number-plugin'
import { normalizeKeyedNumberSettings } from './vector-utils'

export type Format = 'array' | 'object'

export type VectorType<K extends string = string, F extends Format = Format> = F extends 'object'
  ? { [key in K]: number }
  : number[]

type GetKeys<V> = V extends Record<infer K, number> ? K : never

export type VectorObjectSettings<V extends VectorType, K extends string> = GetKeys<V> extends never
  ? K extends never
    ? never
    : { [key in K]: NumberSettings }
  : { [key in GetKeys<V>]: NumberSettings }

export type VectorSettings<V extends VectorType, K extends string> = NumberSettings | VectorObjectSettings<V, K>

export type InternalVectorSettings<K extends string = string, Keys extends K[] = K[], F extends Format = Format> = {
  [key in K]: InternalNumberSettings
} & { keys: Keys; format: F }

export function getVectorSchema(dimension: number) {
  // prettier-ignore
  const isVectorArray = v8n().array().length(dimension).every.number()
  const isVectorObject = (o: any) => {
    if (typeof o !== 'object') return false
    const values = Object.values(o)
    return values.length === dimension && values.every((v: any) => isFinite(v))
  }
  return (o: any) => {
    return isVectorArray.test(o) || isVectorObject(o)
  }
}

export function getVectorType<K extends string>(value: VectorType<K>): Format {
  return Array.isArray(value) ? 'array' : 'object'
}

function convert<Value extends VectorType, F extends Format, K extends string>(
  value: Value,
  format: F,
  keys: K[]
): VectorType<GetKeys<Value> extends never ? K : GetKeys<Value>, F> {
  if (getVectorType(value) === format) return (value as unknown) as any
  return (format === 'array' ? Object.values(value) : mapArrayToKeys(value as number[], keys!)) as any
}

export const validateVector = (value: any) => Object.values(value).every((v: any) => validate(v))

export const sanitizeVector = <K extends string, F extends Format>(
  value: number[] | { [key in K]: number },
  settings: InternalVectorSettings<K, K[], F>
): F extends 'array' ? number[] : { [key in K]: number } => {
  const _value = convert(value, 'object', settings.keys) as any

  for (let key in _value) _value[key] = sanitize(_value[key], settings[key as K])
  return convert(_value, settings.format, settings.keys) as any
}

export const formatVector = <K extends string, F extends Format>(
  value: number[] | { [key in K]: number },
  settings: InternalVectorSettings<K, K[], F>
) => convert(value, 'object', settings.keys)

const isNumberSettings = (o?: object) => o && ('step' in o || 'min' in o || 'max' in o)

export function normalizeVector<Value extends VectorType, K extends string>(
  _value: Value,
  _settings: VectorSettings<Value, K>,
  defaultKeys: K[] = []
) {
  const format: Format = Array.isArray(_value) ? 'array' : 'object'
  const keys = format === 'object' ? Object.keys(_value) : defaultKeys
  const value = convert(_value, 'object', keys)

  // vector can accept either { value: { x, y }, { x: settings, y: settings } }
  // or { value: { x, y }, { settings } } where settings will apply to both keys
  // merged settings will recognize a unified settings and dispatch it to all keys

  const mergedSettings = isNumberSettings(_settings)
    ? keys.reduce((acc, k) => Object.assign(acc, { [k]: _settings }), {})
    : _settings

  const settings = normalizeKeyedNumberSettings(value, mergedSettings)
  return {
    value: (format === 'array' ? _value : value) as Value,
    settings: { ...settings, format, keys },
  }
}

export function getVectorPlugin<K extends string>(defaultKeys: K[]) {
  return {
    schema: getVectorSchema(defaultKeys.length),
    normalize: ({ value, ...settings }: any) => normalizeVector(value, settings, defaultKeys),
    validate: validateVector,
    format: (value: any, settings: InternalVectorSettings) => formatVector(value, settings),
    sanitize: (value: any, settings: InternalVectorSettings) => sanitizeVector(value, settings),
  }
}
