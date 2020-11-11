import { Input } from '../types'

// returns a value in the form of { value, settings}
export function normalizeInput(input: Input) {
  if (typeof input === 'object' && 'value' in input) {
    const { value, ...settings } = input
    return { value, settings, type: typeof value }
  }
  return { value: input, type: typeof input }
}
