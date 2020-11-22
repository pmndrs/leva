import { warn, TwixErrors } from './log'
import * as number from '../components/Number'
import * as color from '../components/Color'
import * as string from '../components/String'
import * as boolean from '../components/Boolean'
import * as point3d from '../components/Point3d'
import * as point2d from '../components/Point2d'
import * as spring from '../components/Spring'

import { ValueInputTypes, Settings, ValueInputWithSettings, MapTypesEnum } from '../types'

const checkers = [
  number.schema,
  color.schema,
  string.schema,
  boolean.schema,
  point3d.schema,
  point2d.schema,
  spring.schema,
]

export function getValueType(value: any, path: string) {
  for (let checker of checkers) {
    const type = checker(value)
    if (type) return type
  }
  warn(TwixErrors.UNKNOWN_INPUT, path, value)
  return undefined
}

type ValueInputFromType<T extends ValueInputTypes> = ValueInputWithSettings<MapTypesEnum[T]>
type SettingsFromType<T extends ValueInputTypes> = Settings<MapTypesEnum[T]>
type NormalizerFn<T extends ValueInputTypes> = (i: ValueInputFromType<T>) => SettingsFromType<T>

type SettingsNormalizers = { [key in ValueInputTypes]?: NormalizerFn<key> }

const settingsNormalizers: SettingsNormalizers = {
  [ValueInputTypes.NUMBER]: number.settings,
}

export function normalizeSettings<T extends ValueInputTypes>(type: T, input: ValueInputFromType<T>) {
  // @ts-ignore I have no idea why input is supposed to be never
  if (type in settingsNormalizers) return settingsNormalizers[type]!(input)
  const { value, ...settings } = input
  return settings
}

type Sanitizers = {
  [key in ValueInputTypes]?: (value: string, settings?: SettingsFromType<key>) => ValueInputFromType<key>['value']
}

export const sanitizers: Sanitizers = {
  [ValueInputTypes.NUMBER]: number.sanitizer,
}

type Formatters = {
  [key in ValueInputTypes]?: (value: ValueInputFromType<key>['value'], settings?: SettingsFromType<key>) => string
}

export const formatters: Formatters = {
  [ValueInputTypes.NUMBER]: number.formatter,
}

type Validators = {
  [key in ValueInputTypes]?: (value: any, settings?: SettingsFromType<key>) => boolean
}

export const validators: Validators = {
  [ValueInputTypes.NUMBER]: number.validator,
}
