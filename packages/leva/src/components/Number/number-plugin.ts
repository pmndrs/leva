import { getStep, clamp } from '../../utils'
import type { InternalNumberSettings, NumberInput } from './number-types'

export const schema = (v: any) => {
  if (typeof v === 'number') return true
  // we consider a string as a number if it starts with a number and it's suffix is less than 4 characters
  if (typeof v === 'string') {
    const _v = parseFloat(v)
    if (isNaN(_v)) return false
    const suffix = v.substring(('' + _v).length).trim()
    return suffix.length < 4
  }
  return false
}

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
  const { min = -Infinity, max = Infinity, ..._settings } = settings

  let _value = parseFloat(value as string)
  const suffix = typeof value === 'string' ? value.substring(('' + _value).length) : undefined
  _value = clamp(_value, min, max)

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
    value: suffix ? _value + suffix : _value,
    settings: { initialValue: _value, step, pad, min, max, suffix, ..._settings },
  }
}

// TODO fix this function, probably not needed
export const sanitizeStep = (
  v: number,
  { step, initialValue }: Pick<InternalNumberSettings, 'step' | 'initialValue'>
) => {
  const steps = Math.round((v - initialValue) / step)
  return initialValue + steps * step!
}
