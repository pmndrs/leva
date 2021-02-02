import * as props from './boolean-plugin'
import { BooleanComponent } from './Boolean'

const plugin = { ...props, component: BooleanComponent }

export * from './Boolean'
export default plugin
