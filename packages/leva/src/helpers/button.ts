import { SpecialInputs } from '../types'
import type { ButtonInput, ButtonSettings } from '../types'

const defaultSettings = { disabled: false }

/**
 *
 * @param name button name
 * @param onClick function that executes when the button is clicked
 */
export function button(onClick: ButtonInput['onClick'], settings?: ButtonSettings): ButtonInput {
  return { type: SpecialInputs.BUTTON, onClick, settings: { ...defaultSettings, ...settings } }
}
