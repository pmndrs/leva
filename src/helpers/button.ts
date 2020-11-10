import { InputTypes } from './../types'

export function button(name: string, fn: () => any) {
  console.log('button', { name })
  return { [name]: { __type: InputTypes.BUTTON, fn } }
}
