import { normalize, getValueType } from '../register'
import { ValueInput, SpecialInput } from '../types'
import { warn, TwixErrors } from './log'

// returns a value in the form of { value, settings}
export function normalizeInput<V, Settings extends object>(
  input: ValueInput<V, Settings> | SpecialInput,
  path: string
) {
  if (typeof input === 'object') {
    // only special inputs should have the type attribute
    if ('type' in input) return input

    const type = getValueType(input)
    // @ts-expect-error
    if (type) return { type, ...normalize(type, input) }
  }
  const type = getValueType({ value: input })
  if (!type) return warn(TwixErrors.UNKNOWN_INPUT, path, input)
  return { type, ...normalize(type, { value: input }) }
}

export const isInput = (key: string) => key.indexOf('_i-') === 0
