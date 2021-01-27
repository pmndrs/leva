import { Format } from '../Vector'
import { InternalNumberSettings } from '../Number/number-plugin'
import { Point3dObject } from '../../types'

export type InternalPoint3dSettings = { [key in keyof Point3dObject]: InternalNumberSettings } & { format: Format }

export const KEYS: (keyof Point3dObject)[] = ['x', 'y', 'z']
