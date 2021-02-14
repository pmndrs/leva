import { createPlugin } from 'leva/plugins'
import { Spring } from './Spring'
import { normalize, sanitize } from './spring-plugin'

export const spring = createPlugin({
  normalize,
  sanitize,
  component: Spring,
})
