import { NumberSettings } from './../../types'
// @ts-expect-error
import v8n from 'v8n'
import { CompleteValueInput, ValueInputTypes } from '../../types'
import { getStepAndPad } from '../../utils'

export const schema = (o: any) =>
  v8n()
    .number()
    .test(o) && ValueInputTypes.NUMBER

export const validator = (v: any, { min = -Infinity, max = Infinity }: NumberSettings) =>
  !isNaN(v) && v > min && v < max

export const formatter = (v: number, { pad = 0 }: NumberSettings) => v.toFixed(pad)
export const sanitizer = (v: string) => Number(v)

export const settings = ({ value, ...s }: CompleteValueInput<number>) => {
  const [step, pad] = getStepAndPad(value)
  return { step, pad, min: -Infinity, max: -Infinity, ...s }
}
