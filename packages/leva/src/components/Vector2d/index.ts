import { Vector2dComponent } from './Vector2d'
import { getVectorPlugin } from '../Vector'
import { createInternalPlugin } from '../../plugin'

export * from './Vector2d'

export default createInternalPlugin({
  component: Vector2dComponent,
  ...getVectorPlugin(['x', 'y']),
})
