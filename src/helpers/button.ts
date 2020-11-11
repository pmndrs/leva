import { SpecialInputTypes, ButtonInput } from './../types'

export function button(name: string, onClick: () => any): Record<string, ButtonInput> {
  return { [name]: { type: SpecialInputTypes.BUTTON, name, onClick } }
}
