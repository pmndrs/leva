import { normalize, getValueType } from '../register'
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
      const { value, ...settings } = input
      const type = getValueType(value, path)
      if (!type) return null
      return { type, ...normalize(type, value, settings) }
    }
  }
  const type = getValueType(input, path)
  if (!type) return null
  return { type, ...normalize(type, input) }
}
