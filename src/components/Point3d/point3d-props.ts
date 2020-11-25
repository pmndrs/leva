// @ts-expect-error
import v8n from 'v8n'
import { NumberSettings } from '../Number/number-props'

export type Point3d = { x: number; y: number; z: number }

export type Point3dSettings = {
  x?: NumberSettings
  y?: NumberSettings
  z?: NumberSettings
}

const number = v8n().number()

// prettier-ignore
const point3dArray = v8n().array().length(3).every.number()
const point3dObj = v8n().schema({ x: number, y: number, z: number })
export const schema = (o: any) =>
  v8n()
    .passesAnyOf(point3dObj, point3dArray)
    .test(o)
