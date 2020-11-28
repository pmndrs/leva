// @ts-expect-error
import v8n from 'v8n'

type SelectSettings = { options: Record<string, any> | any[] }
export type InternalSelectSettings = { keys: string[]; values: any[] }

// the options attribute is either an key value object or an array
export const schema = (_o: any, s: any) =>
  v8n()
    .schema({
      options: v8n().passesAnyOf(v8n().object(), v8n().array()),
    })
    .test(s)

export const format = (value: any, { values }: InternalSelectSettings) => {
  return values.indexOf(value)
}

export const normalize = (value: any, { options, ...settings }: SelectSettings) => {
  let keys
  let values
  if (Array.isArray(options)) {
    values = options
    keys = options.map(String)
  } else {
    values = Object.values(options)
    keys = Object.keys(options)
  }
  if (!values.includes(value)) {
    keys.unshift(String(value))
    values.unshift(value)
  }
  if (!Object.values(options).includes(value)) (options as any)[String(value)] = value
  return { value, settings: { keys, values, ...settings } }
}
