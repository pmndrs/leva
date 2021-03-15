import type { LevaInputProps } from 'leva/plugin'

export type Plot = { expression: string; boundsX?: [number, number]; boundsY?: [number, number] }
export type InternalPlot = math.MathNode & {
  __parsed: math.EvalFunction
  __symbols: string[]
}

export type InternalPlotSettings = {
  boundsX: [number, number]
  boundsY: [number, number]
}

export type PlotProps = LevaInputProps<InternalPlot, InternalPlotSettings, string>
