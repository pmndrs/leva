import type { LevaInputProps } from 'leva/plugin'

/** uncomment when we allow multiple plots */
// export type Plot = string | string[]
// export type InternalPlot = string[]

export type Plot = string
export type InternalPlot = string

export type PlotProps = LevaInputProps<InternalPlot>
