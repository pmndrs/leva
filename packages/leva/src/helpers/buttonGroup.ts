import { SpecialInputTypes } from '../types'
import type { ButtonGroupInput } from '../types'

/**
 *
 * @param name button name
 * @param onClick function that executes when the button is clicked
 */
export function buttonGroup(opts: {
  [title: string]: undefined | (() => void)
}): ButtonGroupInput {
  return { type: SpecialInputTypes.BUTTON_GROUP, opts }
}
