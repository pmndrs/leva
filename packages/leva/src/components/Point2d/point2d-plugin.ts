import { getPointSchema, sanitizePoint, formatPoint, normalizePoint, Format } from '../Point/point-plugin'
import { InternalNumberSettings } from '../Number/number-plugin'
import { InputWithSettings } from '../../types'
import { Point2d, Point2dObject, Point2dSettings } from '../../types/public-api-types'

export type InternalPoint2dSettings = { [key in keyof Point2dObject]: InternalNumberSettings } & { format: Format }
type Point2dInput = InputWithSettings<Point2d, Point2dSettings>

export const KEYS: (keyof Point2dObject)[] = ['x', 'y']
export const schema = getPointSchema(KEYS)

export const sanitize = (v: any, settings: InternalPoint2dSettings) => sanitizePoint(v, settings, KEYS) as Point2d
export const format = (v: any) => formatPoint(v, KEYS)

export const normalize = ({ value, ...settings }: Point2dInput) => {
  return normalizePoint(value as any, settings, KEYS) as { value: Point2d; settings: InternalPoint2dSettings }
}
