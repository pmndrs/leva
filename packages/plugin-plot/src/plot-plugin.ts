import { Data, StoreType } from 'packages/leva/src/types'
import * as math from 'mathjs'
import { parseExpression } from './plot-utils'
import type { PlotInput, InternalPlot, InternalPlotSettings } from './plot-types'

export const sanitize = (
  expression: string,
  _settings: InternalPlotSettings,
  _prevValue: math.MathNode,
  _path: string,
  store: StoreType
) => {
  if (expression === '') throw Error('Empty mathjs expression')
  try {
    return parseExpression(expression, store.get)
  } catch (e) {
    throw Error('Invalid mathjs expression string')
  }
}

export const format = (value: InternalPlot) => {
  return value.__parsed.toString()
}

const defaultSettings = { boundsX: [-1, 1], boundsY: [-Infinity, Infinity], graph: true }

export const normalize = ({ expression, ..._settings }: PlotInput, _path: string, data: Data) => {
  const get = (path: string) => {
    if ('value' in data[path]) return data[path].value
    return undefined // TODO should throw
  }
  const value = parseExpression(expression, get) as (v: number) => any
  const settings = { ...defaultSettings, ..._settings }
  return { value, settings: settings as InternalPlotSettings }
}
