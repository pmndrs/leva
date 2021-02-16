import { Vector2dComponent } from './Vector2d'
import { getVectorPlugin } from '../Vector'

const plugin = { ...getVectorPlugin(['x', 'y']), component: Vector2dComponent }

export * from './Vector2d'
export default plugin
