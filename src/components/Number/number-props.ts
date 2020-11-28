// @ts-expect-error
import v8n from 'v8n'
import { ValueInputWithSettings } from '../../types'
import { getStep, clamp } from '../../utils'

export type NumberSettings = { min?: number; max?: number; step?: number; pad?: number }
type NumberInput = ValueInputWithSettings<number, NumberSettings>

export const schema = (o: any) =>
  v8n()
    .number()
    .test(o)

export const validate = (v: string | number) => v !== '' && !isNaN(Number(v))

export const format = (v: any, { pad = 0 }: NumberSettings = {}) => Number(v).toFixed(pad)
export const sanitize = (v: string, { min = -Infinity, max = Infinity }: NumberSettings = {}) =>
  clamp(Number(v), min, max)

export const normalize = ({ value, ...settings }: NumberInput) => {
  const { min, max } = settings
  let step = settings.step
  if (!step) {
    if (Number.isFinite(min))
      if (Number.isFinite(max)) step = Math.abs(max! - min!) / 400
      else step = Math.abs(value - min!) / 400
    else if (Number.isFinite(max)) step = Math.abs(max! - value) / 400
    else step = getStep(value)
  }
  const pad = Math.max(0, Math.log10(1 / step))
  return { value, settings: { step, pad, min: -Infinity, max: Infinity, ...settings } }
}

export const normalizeKeyValue = <K extends object>(
  obj: K,
  settings: { [key in keyof K]?: NumberSettings } & { [key: string]: any }
) => {
  const _settings: { [key in keyof K]?: NumberSettings } = {}
  Object.entries(obj).forEach(([key, value]) => {
    _settings[key as keyof K] = normalize({ value, ...settings[key as keyof K] }).settings
  })
  return { value: obj, settings: _settings }
}
