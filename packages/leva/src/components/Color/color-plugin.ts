import v8n from 'v8n'
import tc from 'tinycolor2'
import { InputWithSettings, ColorObjectInput } from '../../types'
import { pick } from '../../utils'

type Format = 'hex' | 'rgb'

export type Color = string | ColorObjectInput
export type InternalColorSettings = { format: Format; hasAlpha: boolean }

type ColorInput = InputWithSettings<Color>

const FORMATS = ['name', 'hex', 'hex8', 'rgb']

export const validateColor = () => (value: any) => {
  const c = tc(value)
  const format = c.getFormat()
  // we don't want to handle "rgba(0,0,0,1)"
  return FORMATS.includes(format) && !(format === 'rgb' && typeof value === 'string')
}

v8n.extend({ color: validateColor })
// prettier-ignore
// @ts-expect-error
export const schema = (o: any) => v8n().color().test(o)

function convert(color: tc.Instance, { format, hasAlpha }: InternalColorSettings) {
  if (format === 'hex') return color[hasAlpha ? 'toHex8String' : 'toHexString']()
  const rgba = color.toRgb()
  return hasAlpha ? rgba : pick(rgba, ['r', 'g', 'b'])
}

export const validate = (v: any) => tc(v).isValid()
export const sanitize = (v: any, settings: InternalColorSettings) => convert(tc(v), settings)
export const format = (v: any, { hasAlpha }: InternalColorSettings) => convert(tc(v), { format: 'hex', hasAlpha })

export const normalize = ({ value }: ColorInput) => {
  const color = tc(value)
  const _f = color.getFormat()
  const format = (_f === 'name' || _f === 'hex8' ? 'hex' : _f) as Format
  const hasAlpha = format === 'rgb' ? 'a' in (value as any) : _f === 'hex8'
  const settings = { format, hasAlpha }

  // by santizing the value we make sure the returned value is parsed and fixed,
  // consistent with future updates.
  return { value: sanitize(value, settings), settings }
}
