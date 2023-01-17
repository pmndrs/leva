import { createPlugin, formatVector } from 'leva/plugin'

import { Bezier } from './Bezier'
import { normalize, sanitize } from './bezier-plugin'
import { InternalBezierSettings } from './bezier-types'

export const bezier = createPlugin({
  normalize,
  sanitize,
  format: (value: any, settings: InternalBezierSettings) => formatVector(value, settings),
  component: Bezier,
})
