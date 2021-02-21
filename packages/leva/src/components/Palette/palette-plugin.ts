import v8n from 'v8n'
import { Palette, PaletteInput, PaletteSettings } from '../../types'
import { validateColor } from '../Color/color-plugin'

/**
 * @warning this schema allows rgba object entries but the component doesn't
 * handle them properly.
 * */

v8n.extend({
  color: validateColor,
  // @ts-expect-error
  arrayOfColors: () => (x) => v8n().every.color().test(x),
})

// allows shallow search
const findColor = (value: Palette, array: string[][]) => {
  const v = value.toString()
  return array.findIndex((p) => p.toString() === v)
}

export const format = (value: Palette, { options }: PaletteSettings) => {
  return findColor(value, options)
}

export const schema = (o: any, s: any) => {
  // @ts-expect-error
  return v8n().arrayOfColors().test(o) && v8n().schema({ options: v8n().every.arrayOfColors() }).test(s)
}

export const normalize = ({ value, options }: PaletteInput) => {
  const settings = { options: [...options] }
  // adds value to options if it's not included
  if (findColor(value, options) < 0) settings.options.push(value)
  return { value, settings }
}
