import { getPointSchema, sanitizePoint, formatPoint, normalizePoint, Format } from '../point-plugin'
import { NumberSettings, InternalNumberSettings } from '../../Number/number-plugin'
import { ValueInputWithSettings } from '../../../types'

type Point2dArray = [number, number, number]
type Point2dObj = { x: number; y: number; z: number }
export type Point2d = Point2dObj | Point2dArray

type Point2dSettings = { [key in keyof Point2dObj]?: NumberSettings }
export type InternalPoint2dSettings = { [key in keyof Point2dObj]: InternalNumberSettings } & { format: Format }

type Point2dInput = ValueInputWithSettings<Point2d, Point2dSettings>

export const KEYS: (keyof Point2dObj)[] = ['x', 'y']
export const schema = getPointSchema(KEYS)

export const sanitize = (v: any, settings: InternalPoint2dSettings) => sanitizePoint(v, settings, KEYS) as Point2d
export const format = (v: any) => formatPoint(v, KEYS)

export const normalize = ({ value, ...settings }: Point2dInput) => {
  return normalizePoint(value as any, settings, KEYS) as { value: Point2d; settings: InternalPoint2dSettings }
}
