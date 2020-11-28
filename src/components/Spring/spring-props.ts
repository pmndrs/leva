// @ts-expect-error
import v8n from 'v8n'
import { orderKeys } from '../../utils'
import { NumberSettings, normalizeKeyValue } from '../Number/number-props'

// TODO add spring default settings

export type Spring = { tension: number; friction: number; mass?: number }

export type SpringSettings = {
  [key in keyof Spring]?: NumberSettings
}

const number = v8n().number()

export const schema = (o: any) =>
  v8n()
    .schema({
      tension: number,
      friction: number,
      mass: v8n().optional(number),
    })
    .test(o)

export const normalize = (value: Spring, settings: SpringSettings = {}) => {
  const _value = orderKeys({ mass: 1, ...value }, ['tension', 'friction', 'mass'])
  return normalizeKeyValue(_value, settings)
}
