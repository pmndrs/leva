import type { LevaInputProps, InternalVectorSettings, MergedInputWithSettings } from 'leva/plugin'

export type BuiltInKeys =
  | 'ease'
  | 'linear'
  | 'ease-in'
  | 'ease-out'
  | 'ease-in-out'
  | 'in-out-sine'
  | 'in-out-quadratic'
  | 'in-out-cubic'
  | 'fast-out-slow-in'
  | 'in-out-back'

export type BezierArray = [number, number, number, number]

export type Bezier = BezierArray | BuiltInKeys

export type BezierSettings = { graph?: boolean }
export type BezierInput = MergedInputWithSettings<Bezier, BezierSettings, 'handles'>

export type InternalBezier = [number, number, number, number] & { evaluate(value: number): number }

export type DisplayValueBezier = { x1: number; y1: number; x2: number; y2: number }

export type InternalBezierSettings = InternalVectorSettings<
  keyof DisplayValueBezier,
  (keyof DisplayValueBezier)[],
  'array'
> & { graph: boolean }

export type BezierProps = LevaInputProps<InternalBezier, InternalBezierSettings, DisplayValueBezier>
