import { Format } from '../Vector'
import { InternalNumberSettings } from '../Number/number-plugin'
import { Vector2dObject } from '../../types'

export type InternalVector2dSettings = { [key in keyof Vector2dObject]: InternalNumberSettings } & { format: Format }

export const KEYS: (keyof Vector2dObject)[] = ['x', 'y']
