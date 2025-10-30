import { normalizeVector, sanitizeVector } from 'leva/plugin'
import { bezier } from './bezier-utils'
import type { BezierArray, BezierInput, InternalBezierSettings, InternalBezier, BuiltInKeys } from './bezier-types'

const abscissasSettings = { min: 0, max: 1, step: 0.01 }
const ordinatesSettings = { step: 0.01 }
const defaultSettings = { graph: true, preview: true }

export const BuiltIn: Record<BuiltInKeys, BezierArray> = {
  ease: [0.25, 0.1, 0.25, 1],
  linear: [0, 0, 1, 1],
  'ease-in': [0.42, 0, 1, 1],
  'ease-out': [0, 0, 0.58, 1],
  'ease-in-out': [0.42, 0, 0.58, 1],
  'in-out-sine': [0.45, 0.05, 0.55, 0.95],
  'in-out-quadratic': [0.46, 0.03, 0.52, 0.96],
  'in-out-cubic': [0.65, 0.05, 0.36, 1],
  'fast-out-slow-in': [0.4, 0, 0.2, 1],
  'in-out-back': [0.68, -0.55, 0.27, 1.55],
}

export const normalize = (input: BezierInput = [0.25, 0.1, 0.25, 1]) => {
  let { handles, ..._settings } = typeof input === 'object' && 'handles' in input ? input : { handles: input }
  handles = typeof handles === 'string' ? BuiltIn[handles as BuiltInKeys] || handles : handles

  const mergedSettings = { x1: abscissasSettings, y1: ordinatesSettings, x2: abscissasSettings, y2: ordinatesSettings }

  const { value: _value, settings } = normalizeVector(handles, mergedSettings, ['x1', 'y1', 'x2', 'y2'])
  const value = _value as InternalBezier
  const bezierArgs = _value as [number, number, number, number]
  value.evaluate = bezier(...bezierArgs)
  value.cssEasing = `cubic-bezier(${_value.join(',')})`
  return { value, settings: { ...settings, ...defaultSettings, ..._settings } as InternalBezierSettings }
}

export const sanitize = (value: any, settings: InternalBezierSettings, prevValue?: any) => {
  const _value = sanitizeVector(value, settings, prevValue) as BezierArray
  const newValue = _value as InternalBezier
  const bezierArgs = _value as [number, number, number, number]
  newValue.evaluate = bezier(...bezierArgs)
  newValue.cssEasing = `cubic-bezier(${_value.join(',')})`
  return newValue
}
