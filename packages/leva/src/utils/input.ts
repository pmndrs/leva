import { dequal } from 'dequal/lite'
import { getValueType, normalize, sanitize, validate } from '../plugin'
import { DataInput, SpecialInputTypes } from '../types'
import { warn, LevaErrors } from './log'

/**
 * This function is used to normalize the way an input is stored in the store.
 * Returns a value in the form of { type, value, settings} by doing different
 * checks depending on the input structure.
 *
 * @param input
 * @param path
 */
export function normalizeInput(input: any, path: string) {
  if (typeof input === 'object') {
    if ('type' in input) {
      // If the input is a special input then we return it as it is.
      if (input.type in SpecialInputTypes) return input

      // If the type key exists at this point, it must be a custom plugin
      // defined by the user.
      const { type, ...rest } = input
      return { type, ...normalize(type, { value: rest }) }
    }
    const type = getValueType(input)
    if (type) return { type, ...normalize(type, input) }
  }

  const type = getValueType({ value: input })

  // At this point, if type is null we'll have to warn the user that its input
  // is not recognized.
  if (!type) return warn(LevaErrors.UNKNOWN_INPUT, path, input)

  return { type, ...normalize(type, { value: input }) }
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

type ValueErrorType = { message: string; previousValue: any }

const ValueError = (function (this: ValueErrorType, message: string, value: any) {
  this.message = 'LEVA: ' + message
  this.previousValue = value
} as unknown) as { new (message: string, value: any): ValueErrorType }

export function sanitizeValue({ type, value, settings }: SanitizeProps, newValue: any) {
  const _newValue = typeof newValue === 'function' ? newValue(value) : newValue
  if (!validate(type, _newValue, settings)) {
    throw new ValueError(`The value [${newValue}] did not result in a correct value.`, value)
  }
  const sanitizedNewValue = sanitize(type, _newValue, settings)

  if (dequal(sanitizedNewValue, value)) {
    /**
     * @note This makes the update function throw when the new value is the same
     * as the previous one. This can happen for example, if the minimum value of
     * a number is 30, and the user inputs 15. Then the newValue will be sanitized
     * to 30 and subsequent calls like 14, 0, etc. won't result in the component displaying
     * the value to be notified (ie there wouldn't be a new render)
     */

    throw new ValueError(
      `The value [${newValue}] did not result in a value update, which remained the same: [${value}]. You can ignore this warning if this is the intended behavior.`,
      value
    )
  }
  return sanitizedNewValue
}
