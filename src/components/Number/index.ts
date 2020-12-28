import * as props from './number-plugin'
import { Number } from './Number'

const plugin = { ...props, component: Number }

export * from './Number'
export * from './StyledNumber'
export * from './StyledRange'
export default plugin
