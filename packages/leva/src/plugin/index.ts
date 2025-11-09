// used as entrypoint

// export all components
import React from 'react'
import { Row, Label, Portal, Overlay } from '../components/UI'
import { String } from '../plugins/String'
import { Number } from '../plugins/Number'
import { RangeSlider } from '../plugins/Number/RangeSlider'
import { Boolean } from '../plugins/Boolean'
import { Select } from '../plugins/Select'
import { Vector } from '../plugins/Vector'
import { InnerLabel } from '../components/ValueInput/StyledInput'

export const Components: Record<string, React.ComponentType<any>> = {
  Row,
  Label,
  Portal,
  Overlay,
  String,
  Number,
  Boolean,
  Select,
  Vector,
  InnerLabel,
  RangeSlider,
}

export { colord } from 'colord'
export { dequal } from 'dequal/lite'

export { debounce, clamp, pad, evaluate, range, invertedRange, mergeRefs } from '../utils'
export { normalizeKeyedNumberSettings } from '../plugins/Vector/vector-utils'

export { createPlugin } from '../plugin'

// export vector utilities
export * from '../plugins/Vector/vector-plugin'
// export useful hooks
export { useDrag, useCanvas2d, useTransform, useInput, useValue, useValues, useInputSetters } from '../hooks'
export { useInputContext, useStoreContext } from '../context'

// export styling utilities
export { styled, keyframes, useTh } from '../styles'

// export types
export * from '../types/public'
export type { InternalVectorSettings } from '../plugins/Vector/vector-types'
export type { InternalNumberSettings } from '../plugins/Number/number-types'
