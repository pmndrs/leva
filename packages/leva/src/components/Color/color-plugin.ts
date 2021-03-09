import v8n from 'v8n'
import tc from 'tinycolor2'
import { omit } from '../../utils'
import type { InternalColorSettings, Format, ColorInput } from './color-types'

const convertMap = {
  rgb: 'toRgb',
  hsl: 'toHsl',
  hsv: 'toHsv',
  hex: 'toHexString',
  hex8: 'toHex8String',
}

v8n.extend({
  color: () => (value: any) => tc(value).isValid(),
})
// prettier-ignore
// @ts-expect-error
export const schema = (o: any) => v8n().color().test(o)

function convert(color: tc.Instance, { format, hasAlpha, isString }: InternalColorSettings) {
  const _format = format === 'hex' && hasAlpha ? 'hex8' : format
  if (isString) return color.toString(_format)
  // @ts-ignore
  const colorObj = color[convertMap[_format]]()
  return hasAlpha ? colorObj : omit(colorObj, ['a'])
}

export const sanitize = (v: any, settings: InternalColorSettings) => {
  const color = tc(v)
  if (!color.isValid()) throw Error('Invalid color')
  return convert(color, settings)
}

export const format = (v: any, settings: InternalColorSettings) => {
  return convert(tc(v), { ...settings, isString: true, format: 'hex' })
}

export const normalize = ({ value }: ColorInput) => {
  const color = tc(value)
  const _f = color.getFormat()
  const format = (_f === 'name' || _f === 'hex8' ? 'hex' : _f) as Format
  const hasAlpha = typeof value === 'object' ? 'a' in value : _f === 'hex8' || /^(rgba)|(hsla)|(hsva)/.test(value)
  const settings = { format, hasAlpha, isString: typeof value === 'string' }

  // by santizing the value we make sure the returned value is parsed and fixed,
  // consistent with future updates.
  return { value: sanitize(value, settings), settings }
}
