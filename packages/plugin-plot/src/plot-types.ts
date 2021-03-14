import type { LevaInputProps } from 'leva/plugin'

export type Plot = { expression: string; boundsX?: [number, number]; boundsY?: [number, number]; color?: string }
export type InternalPlot = string
export type InternalPlotSettings = { boundsX: [number, number]; boundsY: [number, number]; color?: string }

export type PlotProps = LevaInputProps<InternalPlot, InternalPlotSettings>
