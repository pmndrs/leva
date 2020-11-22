import { warn, TwixErrors } from './utils/log'

import { ValueInputTypes, Settings, ValueInputWithSettings, MapTypesEnum } from './types'

type ValueInputFromType<T extends ValueInputTypes> = ValueInputWithSettings<MapTypesEnum[T]>
type SettingsFromType<T extends ValueInputTypes> = Settings<MapTypesEnum[T]>
type NormalizerFn<T extends ValueInputTypes> = (i: ValueInputFromType<T>) => SettingsFromType<T>

type SettingsNormalizers = { [key in ValueInputTypes]?: NormalizerFn<key> }

type Sanitizers = {
  [key in ValueInputTypes]?: (value: string, settings?: SettingsFromType<key>) => ValueInputFromType<key>['value']
}

type Formatters = {
  [key in ValueInputTypes]?: (value: ValueInputFromType<key>['value'], settings?: SettingsFromType<key>) => string
}

type Validators = {
  [key in ValueInputTypes]?: (value: any, settings?: SettingsFromType<key>) => boolean
}

export const Plugins = {}

const schemas = []

export function getValueType(value: any, path: string) {
  for (let checker of schemas) {
    const type = checker(value)
    if (type) return type
  }
  warn(TwixErrors.UNKNOWN_INPUT, path, value)
  return undefined
}

export function register({ schema, ...plugin }, type) {
  if (type in Plugins) {
    warn(TwixErrors.ALREADY_REGISTERED_TYPE, type)
    return
  }
  schemas.push(schema)
  Plugins[type] = plugin
}

export function normalizeSettings(type, input) {
  const { settings } = Plugins[type]
  if (settings) return settings(input)
  const { value, ...s } = input
  return s
}
