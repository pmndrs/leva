import { SpecialInputTypes, ButtonInput } from '../types'

/**
 *
 * @param name button name
 * @param onClick function that executes when the button is clicked
 */
export function button(onClick: () => any): ButtonInput {
  return { type: SpecialInputTypes.BUTTON, onClick }
}
