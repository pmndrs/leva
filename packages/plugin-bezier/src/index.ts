import { createPlugin, formatVector } from 'leva/plugin'
import { Bezier } from './Bezier'
import { normalize, sanitize } from './bezier-plugin'

export const bezier = createPlugin({
  normalize,
  sanitize,
  format: formatVector,
  component: Bezier,
})
