import { Vector3dComponent } from './Vector3d'
import { KEYS } from '../Vector3d/vector3d-plugin'
import { getVectorPlugin } from '../Vector'

const plugin = { ...getVectorPlugin(KEYS), component: Vector3dComponent }

export * from './Vector3d'
export default plugin
