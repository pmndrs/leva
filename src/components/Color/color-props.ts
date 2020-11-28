// @ts-expect-error
import v8n from 'v8n'
import tinycolor from 'tinycolor2'
import { ValueInputWithSettings } from '../../types'

type Format = 'name' | 'hex' | 'hex8' | 'rgb'

export type Color = string | { r: number; g: number; b: number; a?: number }
export type ColorSettings = { format?: Format }

type ColorInput = ValueInputWithSettings<Color, ColorSettings>

const FORMATS = ['name', 'hex', 'hex8', 'rgb']

v8n.extend({ color: () => (value: any) => FORMATS.includes(tinycolor(value).getFormat()) })
// prettier-ignore
export const schema = (o: any) => v8n().color().test(o)

function convert(color: tinycolor.Instance, format: Format) {
  return format === 'rgb' ? color.toRgb() : color.toHex8String()
}

export const sanitize = (v: any, { format }: ColorSettings) => convert(tinycolor(v), format!)
export const format = (v: any) => convert(tinycolor(v), 'hex8')

export const normalize = ({ value, format }: ColorInput) => {
  const color = tinycolor(value)
  const valueFormat = color.getFormat() as Format
  format = format || valueFormat
  return { value: convert(color, format), settings: { format } }
}
