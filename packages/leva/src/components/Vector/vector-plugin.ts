import v8n from 'v8n'
import { InputWithSettings } from '../../types'
import { mapArrayToKeys } from '../../utils'
import { sanitize } from '../Number/number-plugin'
import { normalizeKeyedNumberSettings } from './vector-utils'
import { VectorType, Format, GetKeys, InternalVectorSettings, VectorSettings } from './vector-types'

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

export const sanitizeVector = <K extends string, F extends Format>(
  value: VectorType<K>,
  settings: InternalVectorSettings<K, K[], F>,
  prevValue: any
): VectorType<K, F> => {
  const _value = convert(value, 'object', settings.keys) as any
  let _newValue: any = {}
  const _valueKeys = Object.keys(_value)

  // if _value includes all keys of the Vector then _value is the full _newValue
  if (_valueKeys.length === settings.keys.length) _newValue = _value
  else {
    const _prevValue = convert(prevValue, 'object', settings.keys) as any
    // if there's only one key and lock is true we compute the aspect ratio
    if (_valueKeys.length === 1 && settings.locked) {
      const lockedKey = _valueKeys[0]
      const lockedCoordinate = _value[lockedKey]
      const previousLockedCoordinate = _prevValue[lockedKey]
      for (let key in _prevValue) {
        if (key === lockedKey) _newValue[lockedKey] = lockedCoordinate
        else {
          _newValue[key] = previousLockedCoordinate
            ? (_prevValue[key] / previousLockedCoordinate) * lockedCoordinate
            : 0
        }
      }
    } else {
      // _value is incomplete so we merge the previous value with the new one
      _newValue = { ..._prevValue, ..._value }
    }
  }

  for (let key in _newValue) _newValue[key] = sanitize(_newValue[key], settings[key as K])
  return convert(_newValue, settings.format, settings.keys) as any
}

export const formatVector = <K extends string, F extends Format>(
  value: number[] | { [key in K]: number },
  settings: InternalVectorSettings<K, K[], F>
) => convert(value, 'object', settings.keys)

const isNumberSettings = (o?: object) => o && ('step' in o || 'min' in o || 'max' in o)

export function normalizeVector<Value extends VectorType, K extends string>(
  _value: Value,
  { lock = false, ..._settings }: VectorSettings<Value, K>,
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
    settings: { ...settings, format, keys, lock, locked: false },
  }
}

export function getVectorPlugin<K extends string>(defaultKeys: K[]) {
  return {
    schema: getVectorSchema(defaultKeys.length),
    normalize: <Value extends VectorType>({ value, ...settings }: InputWithSettings<Value, VectorSettings<Value, K>>) =>
      normalizeVector(value, settings, defaultKeys),
    format: (value: any, settings: InternalVectorSettings) => formatVector(value, settings),
    sanitize: (value: any, settings: InternalVectorSettings, prevValue: any) =>
      sanitizeVector(value, settings, prevValue),
  }
}
