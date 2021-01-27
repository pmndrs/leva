import { InternalNumberSettings, NumberSettings } from '../../plugins'
import { normalize } from '../Number/number-plugin'

export const normalizeKeyedNumberInput = <V extends Record<string, number>>(
  value: V,
  settings: { [key in keyof V]?: NumberSettings }
) => {
  const _settings = {} as { [key in keyof V]: InternalNumberSettings }

  Object.entries(value).forEach(([key, v]) => {
    _settings[key as keyof V] = normalize({ value: v, ...settings[key as keyof V] }).settings
  })

  return { value, settings: _settings }
}
