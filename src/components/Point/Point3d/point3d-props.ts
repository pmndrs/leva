import { getPointSchema, sanitizePoint, formatPoint, normalizePoint, Format } from '../point-props'
import { NumberSettings } from '../../Number/number-props'

type Point3dArray = [number, number, number]
type Point3dObj = { x: number; y: number; z: number }

export type Point3d = Point3dObj | Point3dArray

export type Point3dSettings = {
  [key in keyof Point3dObj]?: NumberSettings
} & { format?: Format }

export const KEYS: (keyof Point3dObj)[] = ['x', 'y', 'z']
export const schema = getPointSchema(KEYS)

export const sanitize = (v: any, settings: Point3dSettings) => sanitizePoint(v, settings, KEYS)
export const format = (v: any) => formatPoint(v, KEYS)

export const normalize = (value: Point3d, settings: Point3dSettings = {}) => {
  return normalizePoint(value as any, settings, KEYS)
}
