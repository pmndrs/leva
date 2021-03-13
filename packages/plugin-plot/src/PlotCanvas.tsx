import React from 'react'
import { useCanvas2d, useInputContext } from 'leva/plugin'
import { Canvas } from './StyledPlot'
import type { PlotProps } from './plot-types'

export function PlotCanvas() {
  const { displayValue, value, onUpdate, settings } = useInputContext<PlotProps>()

  const [canvas, ctx] = useCanvas2d(() => {})

  return (
    <>
      <Canvas ref={canvas} />
    </>
  )
}
