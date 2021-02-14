import { Vector2dComponent } from './Vector2d'
import { KEYS } from '../Vector2d/vector2d-plugin'
import { getVectorPlugin } from '../Vector'

const plugin = { ...getVectorPlugin(KEYS), component: Vector2dComponent }

export * from './Vector2d'
export default plugin
