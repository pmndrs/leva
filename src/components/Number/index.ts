import * as props from './number-plugin'
import { Number } from './Number'

const { sanitizeStep, ...rest } = props

const plugin = { ...rest, component: Number }

export * from './Number'
export * from './StyledNumber'
export * from './StyledRange'
export { sanitizeStep }
export default plugin
