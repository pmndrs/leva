import v8n from 'v8n'
import { InputWithSettings, NumberSettings } from '../../types'
import { getStep, clamp } from '../../utils'

export type InternalNumberSettings = { min: number; max: number; step: number; pad: number; initialValue: number }
type NumberInput = InputWithSettings<number, NumberSettings>

export const schema = (o: any) => v8n().number().test(o)

export const validate = (v: string | number) => v !== '' && !isNaN(Number(v))

export const format = (v: any, { pad = 0 }: InternalNumberSettings) => Number(v).toFixed(pad)

export const sanitize = (v: string, { min = -Infinity, max = Infinity }: NumberSettings = {}) =>
  clamp(Number(v), min, max)

export const normalize = ({ value, ...settings }: NumberInput) => {
  const { min, max } = settings
  let step = settings.step
  let padStep = getStep(value)
  if (!step) {
    if (Number.isFinite(min))
      if (Number.isFinite(max)) step = +(Math.abs(max! - min!) / 400).toPrecision(1)
      else step = +(Math.abs(value - min!) / 400).toPrecision(1)
    else if (Number.isFinite(max)) step = +(Math.abs(max! - value) / 400).toPrecision(1)
    else step = padStep
  }
  const pad = clamp(Math.log10(1 / padStep), 0, 2)
  return { value, settings: { initialValue: value, step, pad, min: -Infinity, max: Infinity, ...settings } }
}

export const sanitizeStep = (
  v: number,
  { step, initialValue }: Pick<InternalNumberSettings, 'step' | 'initialValue'>
) => {
  const steps = Math.round((v - initialValue) / step)
  return initialValue + steps * step!
}
