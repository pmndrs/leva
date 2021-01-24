import { Plugin, InputWithSettings } from './types'
import { warn, LevaErrors } from './utils/log'

const schemas: ((v: any, settings?: any) => false | string)[] = []

export const Plugins: Record<string, Omit<Plugin<any, any, any, any>, 'schema'>> = {}

export function getValueType({ value, ...settings }: any) {
  for (let checker of schemas) {
    const type = checker(value, settings)
    if (type) return type
  }
  return undefined
}

export function normalize<V, Settings extends object = {}>(type: string, input: InputWithSettings<V, Settings>) {
  const { normalize: _normalize } = Plugins[type]
  if (_normalize) return _normalize(input)
  return input
}

export function register<
  Value,
  Input,
  Settings extends object = {},
  InternalSettings extends object | undefined = undefined
>(type: string, { schema, ...plugin }: Plugin<Value, Input, Settings, InternalSettings>) {
  if (type in Plugins) {
    warn(LevaErrors.ALREADY_REGISTERED_TYPE, type)
    return
  }

  if (schema) {
    schemas.push((value: any, settings?: any) => schema(value, settings) && type)
  }

  Plugins[type] = plugin
}

export function createPlugin<Value, Input, Settings, InternalSettings>(
  type: string,
  plugin: Omit<Plugin<Value, Input, Settings, InternalSettings>, 'schema'>
) {
  register(type, plugin)
  return (input: any) => ({ type, ...input } as Value & { __customInput: true })
}
