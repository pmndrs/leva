import type { SelectInput, InternalSelectSettings } from './select-types'
import { z } from 'zod'

const zValidPrimitive = z.union([z.string(), z.number(), z.boolean()])

/**
 * Schema for the usecase
 *
 * ```ts
 * ['x', 'y', 1, true]
 * ```
 */
const arrayOfPrimitivesSchema = z.array(zValidPrimitive)

/**
 * Schema for the usecase
 *
 * ```ts
 * { x: 1, foo: 'bar', z: true }
 * ```
 */
const keyAsLabelObjectSchema = z.record(z.string(), zValidPrimitive)

/**
 * Schema for the usecase
 *
 * ```ts
 * [{ value: 'x', label: 'X' }, { value: 'y', label: 'Y' }]
 * ```
 */
const valueLabelObjectSchema = z.object({
  value: zValidPrimitive,
  label: z.string().optional(),
})

const arrayOfValueLabelObjectsSchema = z.array(valueLabelObjectSchema)

const allUsecases = z.union([arrayOfPrimitivesSchema, keyAsLabelObjectSchema, arrayOfValueLabelObjectsSchema])

/**
 * Schema for the settings object - checks if it has an 'options' key
 * We accept the three valid SELECT formats:
 * 1. Array of primitives: ['x', 'y', 1]
 * 2. Array of {value, label} objects: [{ value: 'x', label: 'X' }]
 * 3. Object with key-value pairs: { x: 1, y: 2 }
 *
 * Note: We use allUsecases which handles detailed validation, so invalid formats
 * will be caught and warned about in normalize()
 */
const selectInputSchema = z.object({
  options: allUsecases,
})

// the options attribute is either a key value object, an array, or an array of {value, label} objects
export const schema = (_o: any, s: any) => selectInputSchema.safeParse(s).success

export const sanitize = (value: any, { values }: InternalSelectSettings) => {
  if (values.indexOf(value) < 0) throw Error(`Selected value doesn't match Select options`)
  return value
}

export const format = (value: any, { values }: InternalSelectSettings) => {
  return values.indexOf(value)
}

export const normalize = (input: SelectInput) => {
  let { value, options } = input

  let gatheredKeys: string[]
  let gatheredValues: unknown[]

  // Use schemas to identify and handle each use case
  const isArrayOfValueLabelObjects = arrayOfValueLabelObjectsSchema.safeParse(options)
  if (isArrayOfValueLabelObjects.success) {
    // Array of {value, label} objects
    gatheredValues = isArrayOfValueLabelObjects.data.map((o) => o.value)
    gatheredKeys = isArrayOfValueLabelObjects.data.map((o) =>
      o.label !== undefined ? String(o.label) : String(o.value)
    )
  } else {
    const isArrayOfPrimitives = arrayOfPrimitivesSchema.safeParse(options)
    if (isArrayOfPrimitives.success) {
      // Array of primitives
      gatheredValues = isArrayOfPrimitives.data
      gatheredKeys = isArrayOfPrimitives.data.map((o) => String(o))
    } else {
      const isKeyAsLabelObject = keyAsLabelObjectSchema.safeParse(options)
      if (isKeyAsLabelObject.success) {
        // Record/object of key-value pairs
        gatheredValues = Object.values(isKeyAsLabelObject.data)
        gatheredKeys = Object.keys(isKeyAsLabelObject.data)
      } else {
        // Fallback (shouldn't happen if schema validation is correct)
        console.warn(
          '[Leva] Invalid Select options format. Expected one of:\n' +
            '  - Array of primitives: ["x", "y", 1, true]\n' +
            '  - Object with key-value pairs: { x: 1, foo: "bar" }\n' +
            '  - Array of {value, label} objects: [{ value: "x", label: "X" }]\n' +
            'Received:',
          options
        )
        gatheredValues = []
        gatheredKeys = []
      }
    }
  }

  /**
   * If no value is passed, we use the first value found while gathering the keys and values.
   */
  if (!('value' in input)) value = gatheredValues[0]
  /**
   * Supports this weird usecase for backward compatibility:
   *
   * ```ts
   * { value: true, options: [false] }
   *
   * // notice how the value is NOT in the options array.
   * ```
   */ else if (value !== undefined && !gatheredValues.includes(value)) {
    console.warn("[Leva] Selected value doesn't exist in Select options ", input)
    return { value: undefined, settings: { keys: gatheredKeys, values: gatheredValues } }
  }

  return { value, settings: { keys: gatheredKeys, values: gatheredValues } }
}
