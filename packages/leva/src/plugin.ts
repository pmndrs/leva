import { Plugin, CustomInput, InputWithSettings, InternalPlugin } from './types'
import { warn, LevaErrors } from './utils/log'

const Schemas: ((v: any, settings?: any) => false | string)[] = []

export const Plugins: Record<string, Omit<Plugin<any, any, any>, 'schema'>> = {}

export function getValueType({ value, ...settings }: any) {
  for (let checker of Schemas) {
    const type = checker(value, settings)
    if (type) return type
  }
  return undefined
}

/**
 * Populates Schemas and Plugins singletons that are used globally.
 *
 * @param type
 * @param plugin
 */
export function register<Input, Value, InternalSettings, Settings>(
  type: string,
  { schema, ...plugin }: InternalPlugin<Input, Value, Settings, InternalSettings>
) {
  if (type in Plugins) {
    warn(LevaErrors.ALREADY_REGISTERED_TYPE, type)
    return
  }
  Schemas.push((value: any, settings?: any) => schema(value, settings) && type)
  Plugins[type] = plugin
}

const getUniqueType = () => '__CUSTOM__PLUGIN__' + Math.random().toString(36).substr(2, 9)

/**
 * helper function for types
 * @param plugin
 */
export function createInternalPlugin<Input, Value, InternalSettings, Settings>(
  plugin: InternalPlugin<Input, Value, InternalSettings, Settings>
) {
  return plugin
}

/**
 * This function should be used by custom plugins. It is mostly used as a way
 * to properly type the input return value.
 *
 * @param plugin
 */
export function createPlugin<Input, Value, InternalSettings>(plugin: Plugin<Input, Value, InternalSettings>) {
  const type = getUniqueType()
  Plugins[type] = plugin
  return (input?: Input) => ({ type, ...input } as CustomInput<Value>)
}

/**
 * The following functions are part of a plugin structure.
 *
 * @normalize is used to normalize the input into a { value, settings }
 * structure inside the store. It might add settings based on the default among
 * other things.
 *
 * @validate checks if the user value is valid. For example a Number plugin
 * would reject "hello" as invalid;
 *
 * @sanitize sanitizes the user value before registering it to the store. For
 * example, the Number plugin would santize "3.00" into 3.
 *
 * @format is sanitization but for the displayed value. If the input value of
 * the Number plugin, then format will add proper padding and show "3.00".
 *
 */

export function normalize<V, Settings extends object = {}>(type: string, input: InputWithSettings<V, Settings>) {
  const { normalize: _normalize } = Plugins[type]
  if (_normalize) return _normalize(input)
  return input
}

export function sanitize<Settings extends object>(type: string, value: any, settings?: Settings, prevValue?: any) {
  const { sanitize } = Plugins[type]
  if (sanitize) return sanitize(value, settings, prevValue)
  return value
}

export function validate<Settings extends object>(type: string, value: any, settings?: Settings) {
  const { validate } = Plugins[type]
  if (validate) return validate(value, settings)
  return true
}

export function format<Settings extends object>(type: string, value: any, settings?: Settings) {
  const { format } = Plugins[type]
  if (format) return format(value, settings)
  return value
}
