import type { Plot, InternalPlot } from './plot-types'
import { parse } from 'mathjs'

export const sanitize = (value: InternalPlot) => {
  if (value === '') throw Error('Invalid mathjs expression')
  try {
    parse(value)
  } catch {
    throw Error('Invalid mathjs expression')
  }
  return value
}

export const format = (value: InternalPlot) => {
  return parse(value).toString()
}

const defaultSettings = { boundsX: [-1, 1], boundsY: [-Infinity, Infinity] }

export const normalize = ({ expression, ..._settings }: Plot) => {
  const value = format(expression)
  const settings = { ...defaultSettings, ..._settings }
  return { value, settings }
}
