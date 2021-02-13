import { register } from './plugin'
import number from './components/Number'
import select from './components/Select'
import color from './components/Color'
import string from './components/String'
import boolean from './components/Boolean'
import vector3d from './components/Vector3d'
import vector2d from './components/Vector2d'
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
register('VECTOR3D', vector3d)
register('VECTOR2D', vector2d)

export { Leva, LevaPanel } from './components/Leva'
export { LevaStoreProvider } from './context'
export * from './hooks'
export * from './helpers'
export { globalStore as store } from './store'
