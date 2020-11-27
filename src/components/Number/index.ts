import * as props from './number-props'
import { Number } from './Number'

const plugin = { ...props, component: Number }

export * from './Number'
export * from './StyledNumber'
export default plugin
