import { warn, TwixErrors } from './utils/log'
import { Plugin } from './types'

const schemas: ((v: any, settings?: any) => false | string)[] = []

export const Plugins: Record<string, Omit<Plugin<any, any>, 'schema'>> = {}

export function getValueType(value: any, settings: any, path: string) {
  for (let checker of schemas) {
    const type = checker(value, settings)
    if (type) return type
  }
  warn(TwixErrors.UNKNOWN_INPUT, path, value)
  return undefined
}

export function normalize<V, Settings extends object>(type: string, value: V, settings?: Settings) {
  const { normalize: _normalize } = Plugins[type]
  if (_normalize) return _normalize(value, settings)
  return { value, settings }
}

export function register<V, Settings extends object>({ schema, ...plugin }: Plugin<V, Settings>, type: string) {
  if (type in Plugins) {
    warn(TwixErrors.ALREADY_REGISTERED_TYPE, type)
    return
  }
  schemas.push((value: any, settings?: any) => schema(value, settings) && type)
  Plugins[type] = plugin
}
