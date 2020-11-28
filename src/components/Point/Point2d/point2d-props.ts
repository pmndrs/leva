import { getPointSchema, sanitizePoint, formatPoint, normalizePoint, Format } from '../point-props'
import { NumberSettings } from '../../Number/number-props'
import { ValueInputWithSettings } from '../../../types'

type Point2dArray = [number, number, number]
type Point2dObj = { x: number; y: number; z: number }

export type Point2d = Point2dObj | Point2dArray
export type Point2dSettings = { [key in keyof Point2dObj]?: NumberSettings } & { format?: Format }

type Point2dInput = ValueInputWithSettings<Point2d, Point2dSettings>

export const KEYS: (keyof Point2dObj)[] = ['x', 'y']
export const schema = getPointSchema(KEYS)

export const sanitize = (v: any, settings: Point2dSettings) => sanitizePoint(v, settings, KEYS)
export const format = (v: any) => formatPoint(v, KEYS)

export const normalize = ({ value, ...settings }: Point2dInput) => {
  return normalizePoint(value as any, settings, KEYS)
}
