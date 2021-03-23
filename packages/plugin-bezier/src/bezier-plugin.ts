import { normalizeVector, sanitizeVector } from 'leva/plugin'
import type { BezierInput, Bezier, InternalBezierSettings } from './bezier-types'

const abscissasSettings = { min: 0, max: 1, step: 0.01 }
const ordinatesSettings = { step: 0.01 }

export const normalize = (input: BezierInput = [0.25, 0.1, 0.25, 1]) => {
  const value = input
  const mergedSettings = { x1: abscissasSettings, y1: ordinatesSettings, x2: abscissasSettings, y2: ordinatesSettings }

  return normalizeVector(value, mergedSettings, ['x1', 'y1', 'x2', 'y2'])
}

export const sanitize = (value: Bezier, settings: InternalBezierSettings, prevValue?: any) =>
  sanitizeVector(value, settings, prevValue)
