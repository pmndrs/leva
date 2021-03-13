import { createPlugin } from 'leva/plugin'
import { Plot } from './Plot'
import { normalize } from './plot-plugin'

export const plot = createPlugin({
  normalize,
  component: Plot,
})
