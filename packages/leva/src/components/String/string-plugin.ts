import v8n from 'v8n'
import { StringInput } from './string-types'

export const schema = (o: any) => v8n().string().test(o)

export const sanitize = (v: any) => {
  if (typeof v !== 'string') throw Error(`Invalid string`)
  return v
}

export const normalize = ({ value, editable = true, rows = false }: StringInput) => {
  return {
    value,
    settings: { editable, rows: typeof rows === 'number' ? rows : rows ? 5 : 0 },
  }
}
