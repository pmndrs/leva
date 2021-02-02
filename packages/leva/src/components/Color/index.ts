import * as props from './color-plugin'
import { ColorComponent } from './Color'

const plugin = { ...props, component: ColorComponent }

export * from './Color'
export default plugin
