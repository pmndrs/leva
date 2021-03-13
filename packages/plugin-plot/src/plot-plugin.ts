import type { Plot } from './plot-types'

export const normalize = (input: Plot) => {
  // const value = Array.isArray(input) ? input : [input]
  return { value: input }
}
