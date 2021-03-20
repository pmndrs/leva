import type { LevaInputProps } from 'leva/plugin'

export type Plot = { expression: string }
export type PlotSettings = { boundsX?: [number, number]; boundsY?: [number, number]; graph?: boolean }
export type PlotInput = Plot & PlotSettings

export type InternalPlot = {
  (v: number): any
  __parsedScoped: math.MathNode
  __parsed: math.MathNode
  __symbols: string[]
}

export type InternalPlotSettings = Required<PlotSettings>

export type PlotProps = LevaInputProps<InternalPlot, InternalPlotSettings, string>
