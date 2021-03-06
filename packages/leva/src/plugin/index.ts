// used as entrypoint

export { default as tinycolor2 } from 'tinycolor2'
export { debounce, clamp, pad, evaluate } from '../utils'
export { normalizeKeyedNumberSettings } from '../components/Vector/vector-utils'

export { createPlugin } from '../plugin'
export { Row, Label, Portal } from '../components/UI'
export { ValueInput } from '../components/ValueInput'
export * from '../components/Vector/vector-plugin'
export { Vector, getVectorPlugin } from '../components/Vector'
export { useDrag, useDragNumber, useCanvas2d, useTransform, useInput } from '../hooks'
export { useInputContext } from '../context'
// export styling utilities
export { styled, useTh } from '../styles'

// export types
export * from '../types/public'
export type { InternalVectorSettings } from '../components/Vector/vector-types'
export type { InternalNumberSettings } from '../components/Number/number-types'
