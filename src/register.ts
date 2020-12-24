import { Plugin, ValueInputWithSettings } from './types'
import { warn, TwixErrors } from './utils'

const schemas: ((v: any, settings?: any) => false | string)[] = []

export const Plugins: Record<string, Omit<Plugin<any, any, any, any>, 'schema'>> = {}

export function getValueType({ value, ...settings }: any) {
  for (let checker of schemas) {
    const type = checker(value, settings)
    if (type) return type
  }
  return undefined
}

export function normalize<V, Settings extends object = {}>(type: string, input: ValueInputWithSettings<V, Settings>) {
  const { normalize: _normalize } = Plugins[type]
  if (_normalize) return _normalize(input)
  return input
}

export function register<
  V,
  InternalValue,
  Settings extends object = {},
  InternalSettings extends object | undefined = undefined
>({ schema, ...plugin }: Plugin<V, InternalValue, Settings, InternalSettings>, type: string) {
  if (type in Plugins) {
    warn(TwixErrors.ALREADY_REGISTERED_TYPE, type)
    return
  }
  schemas.push((value: any, settings?: any) => schema(value, settings) && type)
  Plugins[type] = plugin
}
