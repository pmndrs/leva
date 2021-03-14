import { getStep, clamp, ceil } from '../../utils'
import type { InternalNumberSettings, NumberInput } from './number-types'

export const schema = (o: any) => typeof o === 'number' || (typeof o === 'string' && !isNaN(parseFloat(o)))

export const sanitize = (v: any, { min = -Infinity, max = Infinity, suffix }: InternalNumberSettings) => {
  const _v = parseFloat(v as string)
  if (v === '' || isNaN(_v)) throw Error('Invalid number')
  const f = clamp(_v, min, max)
  return suffix ? f + suffix : f
}

export const format = (v: any, { pad = 0, suffix }: InternalNumberSettings) => {
  const f = parseFloat(v).toFixed(pad)
  return suffix ? f + suffix : f
}

export const normalize = ({ value, ...settings }: NumberInput) => {
  const { min, max } = settings

  const _value = parseFloat(value as string)
  let suffix
  if (!Number.isFinite(value)) {
    const match = String(value).match(/[A-Z]+/i)
    if (match) suffix = match[0]
  }

  // ideally:
  // 3 -> 3.0
  // { value: 10, step: 0.2 } -> 10.0
  // { value: 10, step: 0.25 } -> 10.00

  let step = settings.step
  if (!step) {
    if (Number.isFinite(min))
      if (Number.isFinite(max)) step = +(Math.abs(max! - min!) / 100).toPrecision(1)
      else step = +(Math.abs(_value - min!) / 100).toPrecision(1)
    else if (Number.isFinite(max)) step = +(Math.abs(max! - _value) / 100).toPrecision(1)
  }
  // padStep should be based on step first
  const padStep = step ? getStep(step) * 10 : getStep(_value)
  step = step || padStep / 10
  const pad = Math.round(clamp(Math.log10(1 / padStep), 0, 2))

  return {
    value,
    settings: { initialValue: _value, step, pad, min: -Infinity, max: Infinity, suffix, ...settings },
  }
}

// TODO fix this function, probably not needed
export const sanitizeStep = (
  v: number,
  { step, initialValue }: Pick<InternalNumberSettings, 'step' | 'initialValue'>
) => {
  const steps = ceil((v - initialValue) / step)
  return initialValue + steps * step!
}
