import type { LevaInputProps, Vector2d, VectorObj } from '../../types'
import type { InternalVectorSettings } from '../Vector/vector-types'

type JoyStickSettingObject = {
  invertY?: boolean
}

export type InternalVector2dSettings = InternalVectorSettings<string, [string, string]> & {
  joystick: boolean | JoyStickSettingObject
}
export type Vector2dProps = LevaInputProps<Vector2d, InternalVector2dSettings, VectorObj>
