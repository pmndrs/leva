import { Point3d } from './Point3d'
import { KEYS } from '../Point3d/point3d-plugin'
import { getVectorPlugin } from '../Vector'

const plugin = { ...getVectorPlugin(KEYS), component: Point3d }

export * from './Point3d'
export default plugin
