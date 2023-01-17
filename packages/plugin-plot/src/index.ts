import { createPlugin } from 'leva/plugin'

import { Plot } from './Plot'
import { normalize, sanitize, format } from './plot-plugin'

export const plot = createPlugin({
  normalize,
  // TODO fix
  // @ts-ignore
  sanitize,
  format,
  component: Plot,
})
