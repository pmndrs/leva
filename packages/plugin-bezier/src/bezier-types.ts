import type { LevaInputProps, InternalVectorSettings } from 'leva/plugin'

export type Bezier = [number, number, number, number]
export type BezierInput = Bezier

export type InternalBezier = Bezier & { evaluate(value: number): number }

export type DisplayValueBezier = { x1: number; y1: number; x2: number; y2: number }

export type InternalBezierSettings = InternalVectorSettings<
  keyof DisplayValueBezier,
  (keyof DisplayValueBezier)[],
  'array'
>

export type BezierProps = LevaInputProps<InternalBezier, InternalBezierSettings, DisplayValueBezier>
