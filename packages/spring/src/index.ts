import { createPlugin } from '@leva/leva/plugins'
import { Spring } from './Spring'
import { normalize } from './spring-plugin'

export const spring = createPlugin({
  normalize,
  component: Spring,
})
