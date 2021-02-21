import v8n from 'v8n'
import { validateColor } from '../Color/color-plugin'

v8n.extend({
  color: validateColor,
  arrayOfColors: () => (x) => {
    return v8n().every.color().test(x)
  },
})

export const format = (value: any, { options }) => {
  return options.indexOf(value)
}

export const schema = (o: any, s: any) => {
  return v8n()
    .schema({
      options: v8n().every.arrayOfColors(),
    })
    .test(s)
}

export const normalize = ({ value, ...settings }) => ({ value, settings })
