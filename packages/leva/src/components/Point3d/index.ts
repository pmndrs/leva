import { Point3d } from './Point3d'
import { KEYS } from '../Point3d/point3d-plugin'
import { getPointPlugin } from '../Vector/vector-plugin'

const plugin = { ...getPointPlugin(KEYS), component: Point3d }

export * from './Point3d'
export default plugin
