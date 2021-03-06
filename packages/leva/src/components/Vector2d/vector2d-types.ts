import { LevaInputProps, Vector2d, VectorObj } from '../../types'
import { InternalVectorSettings } from '../Vector/vector-types'

export type InternalVector2dSettings = InternalVectorSettings<string, [string, string]> & { joystick: boolean }
export type Vector2dProps = LevaInputProps<Vector2d, InternalVector2dSettings, VectorObj>
