import { ButtonInput } from './../types'
import { ValueInput } from '../types'

function getValueType(value: any) {
  return (typeof value).toUpperCase()
}

// returns a value in the form of { value, settings}
export function normalizeInput(input: ValueInput | ButtonInput) {
  if (typeof input === 'object') {
    // only special inputs should have the type attribute
    if ('type' in input) return input
    if ('value' in input) {
      const { value, ...settings } = input
      return { value, settings, type: getValueType(value) }
    }
  }
  return { value: input, type: getValueType(input) }
}
