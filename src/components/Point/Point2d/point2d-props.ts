import { getPointSchema, sanitizePoint, formatPoint, normalizePoint, Format } from '../point-props'
import { NumberSettings } from '../../Number/number-props'

type Point2dArray = [number, number, number]
type Point2dObj = { x: number; y: number; z: number }

export type Point2d = Point2dObj | Point2dArray

export type Point2dSettings = {
  [key in keyof Point2dObj]?: NumberSettings
} & { format?: Format }

export const KEYS: (keyof Point2dObj)[] = ['x', 'y']
export const schema = getPointSchema(KEYS)

export const sanitize = (v: any, settings: Point2dSettings) => sanitizePoint(v, settings, KEYS)
export const format = (v: any) => formatPoint(v, KEYS)

export const normalize = (value: Point2d, settings: Point2dSettings = {}) => {
  return normalizePoint(value as any, settings, KEYS)
}
