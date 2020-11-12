import { ButtonInput } from './../types'
import { ValueInput } from '../types'
import { getValueType } from '../schemas'

function inputError(input: any, path: string) {
  console.warn(`Twix: input at path: "${path}" is not supported`, input)
  return null
}

// returns a value in the form of { value, settings}
export function normalizeInput(input: ValueInput | ButtonInput, path: string) {
  if (typeof input === 'object') {
    // only special inputs should have the type attribute
    if ('type' in input) return input
    if ('value' in input) {
      const { value, ...settings } = input
      const type = getValueType(value)
      if (!type) return inputError(input, path)
      return { value, settings, type }
    }
  }
  const type = getValueType(input)
  if (!type) return inputError(input, path)
  return { value: input, type }
}
