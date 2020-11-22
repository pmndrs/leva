import { warn, TwixErrors } from './utils/log'
import { Plugin, ValueInputWithSettings } from './types'

const schemas: ((v: any) => false | string)[] = []

export const Plugins: Record<string, Omit<Plugin, 'schema'>> = {}

export function getValueType(value: any, path: string) {
  for (let checker of schemas) {
    const type = checker(value)
    if (type) return type
  }
  warn(TwixErrors.UNKNOWN_INPUT, path, value)
  return undefined
}

export function register({ schema, ...plugin }: Plugin, type: string) {
  if (type in Plugins) {
    warn(TwixErrors.ALREADY_REGISTERED_TYPE, type)
    return
  }
  schemas.push((value: any) => schema(value) && type)
  Plugins[type] = plugin
}

export function normalizeSettings(type: string, input: ValueInputWithSettings) {
  const { settings } = Plugins[type]
  if (settings) return settings(input)
  const { value, ...s } = input
  return s
}
