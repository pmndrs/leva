import { LevaInputProps, Vector3d, VectorObj } from '../../types'
import { InternalVectorSettings } from '../Vector/vector-types'

export type InternalVector3dSettings = InternalVectorSettings<string, [string, string, string]>
export type Vector3dProps = LevaInputProps<Vector3d, InternalVector3dSettings, VectorObj>
