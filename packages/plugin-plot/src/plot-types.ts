import type { LevaInputProps } from 'leva/plugin'
import type { MathNode } from 'mathjs'

export type Plot = { expression: string; boundsX?: [number, number]; boundsY?: [number, number] }
export type InternalPlot = MathNode
export type InternalPlotSettings = { boundsX: [number, number]; boundsY: [number, number] }

export type PlotProps = LevaInputProps<InternalPlot, InternalPlotSettings, string>
