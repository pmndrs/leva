import { getPointSchema, sanitizePoint, formatPoint, normalizePoint, Format } from '../point-plugin'
import { InternalNumberSettings } from '../../Number/number-plugin'
import { InputWithSettings } from '../../../types/'
import { Point3d, Point3dObject, Point3dSettings } from '../../../types/public-api-types'

export type InternalPoint3dSettings = { [key in keyof Point3dObject]: InternalNumberSettings } & { format: Format }

type Point3dInput = InputWithSettings<Point3d, Point3dSettings>

export const KEYS: (keyof Point3dObject)[] = ['x', 'y', 'z']
export const schema = getPointSchema(KEYS)

export const sanitize = (v: any, settings: InternalPoint3dSettings) => sanitizePoint(v, settings, KEYS) as Point3d
export const format = (v: any) => formatPoint(v, KEYS)

export const normalize = ({ value, ...settings }: Point3dInput) => {
  return normalizePoint(value, settings, KEYS) as { value: Point3d; settings: InternalPoint3dSettings }
}
