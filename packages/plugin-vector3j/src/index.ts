// import { formatVector } from 'leva/plugin'
import { createPlugin } from 'leva/plugin'
import { getVectorPlugin } from 'leva/plugin'
import { Vector3j } from './Vector3j'

// import { normalize, sanitize } from './bezier-plugin'
// import { InternalBezierSettings } from './bezier-types'

// export const bezier = createPlugin({
//   normalize,
//   sanitize,
//   format: (value: any, settings: InternalBezierSettings) => formatVector(value, settings),
//   component: Bezier,
// })

// NOTE: Note sure this is needed
// export * from './Vector3joy'

export const vector3j = createPlugin({
  component: Vector3j,
  ...getVectorPlugin(['x', 'y', 'z']),
})
