import { normalize, getValueType, Plugins } from '../register'
import { DataInput } from '../types'
import { warn, LevaErrors } from './log'

// returns a value in the form of { value, settings}
export function normalizeInput(input: any, path: string) {
  if (typeof input === 'object') {
    // only special inputs should have the type attribute
    if ('type' in input) return input

    const type = getValueType(input)
    if (type) return { type, ...normalize(type, input) }
  }
  const type = getValueType({ value: input })
  if (!type) return warn(LevaErrors.UNKNOWN_INPUT, path, input)
  return { type, ...normalize(type, { value: input }) }
}

export const isInput = (v: object) => '__levaInput' in v

function sanitize<Settings extends object>(type: string, value: any, settings?: Settings) {
  const { sanitize } = Plugins[type]
  if (sanitize) return sanitize(value, settings)
  return value
}

function validate<Settings extends object>(type: string, value: any, settings?: Settings) {
  const { validate } = Plugins[type]
  if (validate) return validate(value, settings)
  return true
}

export function updateInput(input: DataInput, newValue: any) {
  const { value, type, settings } = input
  input.value = sanitizeValue({ type, value, settings }, newValue)
}

type SanitizeProps = {
  type: string
  value: any
  settings: object | undefined
}

export function sanitizeValue({ type, value, settings }: SanitizeProps, newValue: any) {
  const _newValue = typeof newValue === 'function' ? newValue(value) : newValue

  if (!validate(type, _newValue, settings)) {
    throw value
  }
  const sanitizedNewValue = sanitize(type, _newValue, settings)

  if (sanitizedNewValue === value) {
    /**
     * @note This makes the update function throw when the new value is the same
     * as the previous one. This can happen for example, if the minimum value of
     * a number is 30, and the user inputs 15. Then the newValue will be sanitized
     * to 30 and subsequent calls like 14, 0, etc. won't result in the component displaying
     * the value to be notified (ie there wouldn't be a new render)
     */
    throw value
  }
  return sanitizedNewValue
}
