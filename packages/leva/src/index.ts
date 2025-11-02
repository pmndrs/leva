import { register } from './plugin'
import number from './plugins/Number'
import select from './plugins/Select'
import color from './plugins/Color'
import string from './plugins/String'
import boolean from './plugins/Boolean'
import vector3d from './plugins/Vector3d'
import vector2d from './plugins/Vector2d'
import image from './plugins/Image'
import interval from './plugins/Interval'
import { LevaInputs } from './types'

/**
 * Register all the primitive inputs.
 * @note could potentially be done elsewhere.
 */

register(LevaInputs.SELECT, select)
register(LevaInputs.IMAGE, image)
register(LevaInputs.NUMBER, number)
register(LevaInputs.COLOR, color)
register(LevaInputs.STRING, string)
register(LevaInputs.BOOLEAN, boolean)
register(LevaInputs.INTERVAL, interval)
register(LevaInputs.VECTOR3D, vector3d)
register(LevaInputs.VECTOR2D, vector2d)

// main hook
export { useControls } from './useControls'

// panel components
export { Leva, LevaPanel } from './components/Leva'

// simplifies passing store as context
export { useStoreContext, LevaStoreProvider } from './context'

// export the levaStore (default store)
// hook to create custom store
export { levaStore, useCreateStore } from './store'

// export folder, monitor, button
export * from './helpers'

export { LevaInputs }
