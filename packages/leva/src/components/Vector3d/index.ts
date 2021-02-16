import { Vector3dComponent } from './Vector3d'
import { getVectorPlugin } from '../Vector'

const plugin = { ...getVectorPlugin(['x', 'y', 'z']), component: Vector3dComponent }

export * from './Vector3d'
export default plugin
