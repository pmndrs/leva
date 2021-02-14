import { Format } from '../Vector'
import { InternalNumberSettings } from '../Number/number-plugin'
import { Vector3dObject } from '../../types'

export type InternalVector3dSettings = { [key in keyof Vector3dObject]: InternalNumberSettings } & { format: Format }

export const KEYS: (keyof Vector3dObject)[] = ['x', 'y', 'z']
