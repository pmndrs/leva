import v8n from 'v8n'
import type { SelectInput, InternalSelectSettings } from './select-types'

// the options attribute is either a key value object, an array, or an array of {value, label} objects
export const schema = (_o: any, s: any) =>
  v8n()
    .schema({
      options: v8n().passesAnyOf(v8n().object(), v8n().array()),
    })
    .test(s)

export const sanitize = (value: any, { values }: InternalSelectSettings) => {
  if (values.indexOf(value) < 0) throw Error(`Selected value doesn't match Select options`)
  return value
}

export const format = (value: any, { values }: InternalSelectSettings) => {
  return values.indexOf(value)
}

export const normalize = (input: SelectInput) => {
  let { value, options } = input
  let keys
  let values

  if (Array.isArray(options)) {
    // Check if this is an array of {value, label} objects
    if (options.length > 0 && typeof options[0] === 'object' && options[0] !== null && 'value' in options[0]) {
      values = options.map((o: any) => o.value)
      keys = options.map((o: any) => ('label' in o ? String(o.label) : String(o.value)))
    } else {
      values = options
      keys = options.map((o) => String(o))
    }
  } else {
    values = Object.values(options)
    keys = Object.keys(options)
  }

  if (!('value' in input)) value = values[0]
  else if (!values.includes(value)) {
    keys.unshift(String(value))
    values.unshift(value)
  }

  // Only modify options object for backward compatibility when it's actually an object
  if (!Array.isArray(options) && !Object.values(options).includes(value)) {
    (options as any)[String(value)] = value
  }
  return { value, settings: { keys, values } }
}
