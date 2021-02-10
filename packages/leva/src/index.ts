import { register } from './plugin'
import number from './components/Number'
import select from './components/Select'
import color from './components/Color'
import string from './components/String'
import boolean from './components/Boolean'
import point3d from './components/Point3d'
import point2d from './components/Point2d'
import image from './components/Image'
import interval from './components/Interval'

/**
 * Register all the primitive inputs.
 * @note could potentially be done elsewhere.
 */

register('SELECT', select)
register('IMAGE', image)
register('NUMBER', number)
register('COLOR', color)
register('STRING', string)
register('BOOLEAN', boolean)
register('INTERVAL', interval)
register('POINT3D', point3d)
register('POINT2D', point2d)

export { Leva, LevaPanel } from './components/Leva'
export { LevaStoreProvider } from './context'
export * from './hooks'
export * from './helpers'
export { globalStore as store } from './store'
