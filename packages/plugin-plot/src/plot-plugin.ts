import type { Plot, InternalPlot } from './plot-types'
import { parse } from 'mathjs'

export const sanitize = (value: string) => {
  if (value === '') throw Error('Invalid mathjs expression')
  try {
    return parse(value)
  } catch {
    throw Error('Invalid mathjs expression')
  }
}

export const format = (value: InternalPlot) => {
  return value.toString()
}

const defaultSettings = { boundsX: [-1, 1], boundsY: [-Infinity, Infinity] }

export const normalize = ({ expression, ..._settings }: Plot) => {
  const value = sanitize(expression)
  const settings = { ...defaultSettings, ..._settings }
  return { value, settings }
}
