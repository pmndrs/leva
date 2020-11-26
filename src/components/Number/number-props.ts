// @ts-expect-error
import v8n from 'v8n'
import { getStep, clamp } from '../../utils'

export type NumberSettings = { min?: number; max?: number; step?: number; pad?: number }

export const schema = (o: any) =>
  v8n()
    .number()
    .test(o)

export const validator = (v: string | number) => v !== '' && !isNaN(Number(v))

export const formatter = (v: any, { pad = 0 }: NumberSettings = {}) => Number(v).toFixed(pad)
export const sanitizer = (v: string, { min = -Infinity, max = Infinity }: NumberSettings = {}) =>
  clamp(Number(v), min, max)

export const normalize = (value: number, settings: NumberSettings = {}) => {
  const step = settings.step || getStep(value)
  const pad = Math.max(0, Math.log10(1 / step))
  return { value, settings: { step, pad, min: -Infinity, max: Infinity, ...settings } }
}

export const normalizeKeyValue = <K extends object>(obj: K, settings: { [key in keyof K]?: NumberSettings }) => {
  const _settings: { [key in keyof K]?: NumberSettings } = {}
  Object.entries(obj).forEach(([key, v]) => {
    _settings[key as keyof K] = normalize(v, settings[key as keyof K]).settings
  })
  return { value: obj, settings: _settings }
}
