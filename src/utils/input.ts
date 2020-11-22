import { getValueType, normalizeSettings } from '../register'
import { ValueInput, SpecialInputs } from '../types'

// returns a value in the form of { value, settings}
export function normalizeInput<V, Settings extends object>(
  input: ValueInput<V, Settings> | SpecialInputs,
  path: string
) {
  if (typeof input === 'object') {
    // only special inputs should have the type attribute
    if ('type' in input) return input
    if ('value' in input) {
      const { value } = input
      const type = getValueType(value, path)
      if (!type) return null
      return { type, value, settings: normalizeSettings(type, input) }
    }
  }
  const type = getValueType(input, path)
  if (!type) return null
  return { type, value: input, settings: normalizeSettings(type, { value: input }) }
}
