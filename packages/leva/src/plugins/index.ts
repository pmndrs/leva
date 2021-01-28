// used as entrypoint

import { styled, css } from '../styles/stitches.config'

export { createPlugin } from '../plugin'
export { Row, Label } from '../components/UI'
export { ValueInput } from '../components/ValueInput'
export { Vector, getVectorPlugin } from '../components/Vector'
export { useDrag, useDragNumber, useCanvas2d, useInputContext } from '../hooks/'

// export styling utilities
export { styled }
export const createTheme = css.theme

// export types
export type { LevaInputProps, InputWithSettings, NumberSettings } from '../types'
export type { InternalNumberSettings } from '../components/Number/number-plugin'
