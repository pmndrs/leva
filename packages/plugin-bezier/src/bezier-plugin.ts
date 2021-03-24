import { normalizeVector, sanitizeVector } from 'leva/plugin'
import { bezier } from './bezier-utils'
import type { BezierInput, Bezier, InternalBezierSettings, InternalBezier } from './bezier-types'

const abscissasSettings = { min: 0, max: 1, step: 0.01 }
const ordinatesSettings = { step: 0.01 }

export const normalize = (input: BezierInput = [0.25, 0.1, 0.25, 1]) => {
  const mergedSettings = { x1: abscissasSettings, y1: ordinatesSettings, x2: abscissasSettings, y2: ordinatesSettings }

  const { value: _value, settings } = normalizeVector(input, mergedSettings, ['x1', 'y1', 'x2', 'y2'])
  const value = _value as InternalBezier
  value.evaluate = bezier(..._value)
  return { value, settings }
}

export const sanitize = (value: Bezier, settings: InternalBezierSettings, prevValue?: any) => {
  const newValue = sanitizeVector(value, settings, prevValue) as InternalBezier
  newValue.evaluate = bezier(...value)
  return newValue
}
