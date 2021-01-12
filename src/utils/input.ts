import { normalize, getValueType } from '../register'
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
