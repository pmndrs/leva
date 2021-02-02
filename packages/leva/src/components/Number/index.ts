import * as props from './number-plugin'
import { NumberComponent } from './Number'

const { sanitizeStep, ...rest } = props

const plugin = { ...rest, component: NumberComponent }

export * from './Number'
export * from './StyledNumber'
export * from './StyledRange'
export { sanitizeStep }
export default plugin
