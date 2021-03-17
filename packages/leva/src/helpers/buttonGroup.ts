import { SpecialInputs } from '../types'
import type { ButtonGroupInput } from '../types'

/**
 *
 * @param name button name
 * @param onClick function that executes when the button is clicked
 */
export function buttonGroup(opts: { [title: string]: () => void }): ButtonGroupInput {
  return { type: SpecialInputs.BUTTON_GROUP, opts }
}
