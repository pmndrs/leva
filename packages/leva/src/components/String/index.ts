import * as props from './string-plugin'
import { StringComponent } from './String'

const plugin = { ...props, component: StringComponent }

export * from './String'
export default plugin
