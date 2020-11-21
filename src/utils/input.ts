import { ButtonInput } from './../types'
import { ValueInput } from '../types'
import { getValueType, normalizeSettings } from './schemas'

// returns a value in the form of { value, settings}
export function normalizeInput(input: ValueInput | ButtonInput, path: string) {
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
