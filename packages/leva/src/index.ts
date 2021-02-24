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

// main hook
export { useControls } from './useControls'

// hook to create custom store
export { useCreateStore } from './useCreateStore'

// panel components
export { Leva, LevaPanel } from './components/Leva'

// simplifies passing store as context
export { useStoreContext, LevaStoreProvider } from './context'

// export the globalStore (default store)
export { globalStore } from './store'

// export folder, monitor, button
export * from './helpers'
