import { createPlugin } from 'leva/plugin'
// import { Vector3dSettings } from 'leva/plugin'
// import { getVectorPlugin } from 'leva/plugin'
import { Vector3j } from './Vector3j'
import { sanitize, normalize, format } from './vector3j-plugin'

// ???
// export * from './Vector3joy'

export const vector3j = createPlugin({
  sanitize,
  format,
  normalize,
  component: Vector3j,
  // ...getVectorPlugin(['x', 'y', 'z']),
})
