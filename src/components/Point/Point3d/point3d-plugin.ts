import { getPointSchema, sanitizePoint, formatPoint, normalizePoint, Format } from '../point-plugin'
import { InternalNumberSettings, NumberSettings } from '../../Number/number-plugin'
import { InputWithSettings } from '../../../types/'

type Point3dArray = [number, number, number]
type Point3dObj = { x: number; y: number; z: number }
export type Point3d = Point3dObj | Point3dArray

type Point3dSettings = { [key in keyof Point3dObj]?: NumberSettings }
export type InternalPoint3dSettings = { [key in keyof Point3dObj]: InternalNumberSettings } & { format: Format }

type Point3dInput = InputWithSettings<Point3d, Point3dSettings>

export const KEYS: (keyof Point3dObj)[] = ['x', 'y', 'z']
export const schema = getPointSchema(KEYS)

export const sanitize = (v: any, settings: InternalPoint3dSettings) => sanitizePoint(v, settings, KEYS) as Point3d
export const format = (v: any) => formatPoint(v, KEYS)

export const normalize = ({ value, ...settings }: Point3dInput) => {
  return normalizePoint(value, settings, KEYS) as { value: Point3d; settings: InternalPoint3dSettings }
}
