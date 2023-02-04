import type { LevaInputProps, Vector3d, VectorObj } from 'leva/plugin'
import type { InternalVectorSettings } from 'leva/plugin'

export type InternalVector3dSettings = InternalVectorSettings<string, [string, string, string]> & {
  joystick: boolean | 'invertY'
}
export type Vector3jProps = LevaInputProps<Vector3d, InternalVector3dSettings, VectorObj>
