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
    // select uses options
    if ('value' in input || 'options' in input) {
      const type = getValueType(input, path)
      if (!type) return null
      // @ts-expect-error
      return { type, ...normalize(type, input) }
    }
  }
  const type = getValueType({ value: input }, path)
  if (!type) return null
  return { type, ...normalize(type, { value: input }) }
}
