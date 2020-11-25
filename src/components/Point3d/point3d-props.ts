// @ts-expect-error
import v8n from 'v8n'
import { orderKeys } from '../../utils'
import { NumberSettings, normalizeKeyValue } from '../Number/number-props'

export type Point3d = { x: number; y: number; z: number }

export type Point3dSettings = {
  [key in keyof Point3d]?: NumberSettings
}

const number = v8n().number()

// prettier-ignore
const point3dArray = v8n().array().length(3).every.number()
const point3dObj = v8n().schema({ x: number, y: number, z: number })
export const schema = (o: any) =>
  v8n()
    .passesAnyOf(point3dObj, point3dArray)
    .test(o)

export const normalize = (value: Point3d, settings: Point3dSettings = {}) => {
  return normalizeKeyValue(orderKeys(value, ['x', 'y', 'z']), settings)
}
