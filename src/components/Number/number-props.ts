// @ts-expect-error
import v8n from 'v8n'
import { getStep, clamp } from '../../utils'

export type NumberSettings = { min?: number; max?: number; step?: number; pad?: number }

export const schema = (o: any) =>
  v8n()
    .number()
    .test(o)

export const validator = (v: any) => !isNaN(v)

export const formatter = (v: any, { pad = 0 }: NumberSettings = {}) => Number(v).toFixed(pad)
export const sanitizer = (v: string, { min = -Infinity, max = Infinity }: NumberSettings = {}) =>
  clamp(Number(v), min, max)

export const normalizeSettings = (value: number, settings: NumberSettings = {}) => {
  const step = settings.step || getStep(value)
  const pad = Math.max(0, Math.log10(1 / step))
  return { step, pad, min: -Infinity, max: Infinity, ...settings }
}
