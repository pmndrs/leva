import { NumberSettings } from '../../types'
import { InternalNumberSettings, normalize } from '../Number/number-plugin'

export const normalizeKeyedNumberInput = <V extends Record<string, number>>(
  value: V,
  settings: { [key in keyof V]?: NumberSettings }
) => {
  const _settings = {} as { [key in keyof V]: InternalNumberSettings }

  let maxStep = 0
  Object.entries(value).forEach(([key, v]: [keyof V, any]) => {
    _settings[key] = normalize({ value: v, ...settings[key] }).settings
    maxStep = Math.max(maxStep, _settings[key].step)
    const { step, min, max } = (settings[key] as any) || {}
    if (!isFinite(step) && (!isFinite(min) || !isFinite(max))) _settings[key].step = maxStep
  })

  return { value, settings: _settings }
}
