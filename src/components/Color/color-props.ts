// @ts-expect-error
import v8n from 'v8n'
// @ts-ignore
import parse from 'color-parser'

v8n.extend({ color: () => (value: any) => !!parse(value) })

const number = v8n().number()

const colorString = v8n().color()
const colorObj = v8n().schema({ r: number, g: number, b: number, a: v8n().optional(number) })
export const schema = (o: any) =>
  v8n()
    .passesAnyOf(colorString, colorObj)
    .test(o)
