import { InputTypes } from './../types'

export function button(name: string, fn: () => any) {
  console.log('button', { name })
  return { __type: InputTypes.BUTTON, name, fn }
}
