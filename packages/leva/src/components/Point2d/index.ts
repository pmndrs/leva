import { Point2d } from './Point2d'
import { KEYS } from '../Point2d/point2d-plugin'
import { getVectorPlugin } from '../Vector'

const plugin = { ...getVectorPlugin(KEYS), component: Point2d }

export * from './Point2d'
export default plugin
