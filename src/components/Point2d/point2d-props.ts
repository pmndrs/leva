// @ts-expect-error
import v8n from 'v8n'
import { orderKeys } from '../../utils'
import { NumberSettings, normalizeKeyValue } from '../Number/number-props'

export type Point2d = { x: number; y: number }

export type Point2dSettings = {
  [key in keyof Point2d]?: NumberSettings
}

const number = v8n().number()
// prettier-ignore
const point2dArray = v8n().array().length(2).every.number()
const point2dObj = v8n().schema({ x: number, y: number })
export const schema = (o: any) =>
  v8n()
    .passesAnyOf(point2dObj, point2dArray)
    .test(o)

export const normalize = (value: Point2d, settings: Point2dSettings = {}) => {
  return normalizeKeyValue(orderKeys(value, ['x', 'y']), settings)
}
