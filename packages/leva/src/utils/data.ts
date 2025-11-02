import { pick, normalizeInput, join, warn, LevaErrors } from '.'
import { Data, FolderSettings, MappedPaths, SpecialInputs } from '../types'

/**
 * Takes a data object with { [path.key]: value } and returns { [key]: value }.
 * Also warns when two similar keys are being used by the user.
 *
 * @param data
 * @param paths
 * @param shouldWarn
 */
export function getValuesForPaths(data: Data, paths: string[]) {
  return Object.entries(pick(data, paths)).reduce(
    // Typescript complains that SpecialInput type doesn't have a value key.
    // But getValuesForPath is only called from paths that are inputs,
    // so they always have a value key.

    // @ts-expect-error
    (acc, [, { value, disabled, key }]) => {
      acc[key] = disabled ? undefined : value
      return acc
    },
    {} as { [path: string]: any }
  )
}

/**
 * Recursively extract the data from the schema, sets folder initial
 * preferences and normalize the inputs (normalizing an input means parsing the
 * input object, identify its type and normalize its settings).
 *
 * @param schema - The schema to parse
 * @param rootPath - Used for recursivity, the current path in the tree
 * @param mappedPaths - Object that maps keys to their paths and handlers
 * @param folders - Object that stores folder settings
 * @returns The parsed data object
 */
export function getDataFromSchema(
  schema: any,
  rootPath: string,
  mappedPaths: MappedPaths,
  folders: Record<string, FolderSettings>
): Data {
  const data: Data = {}

  Object.entries(schema).forEach(([key, rawInput]: [string, any]) => {
    // if the key is empty, skip schema parsing and prompt an error.
    if (key === '') return warn(LevaErrors.EMPTY_KEY)

    let newPath = join(rootPath, key)

    // If the input is a folder, then we recursively parse its schema and assign
    // it to the current data.
    if (rawInput.type === SpecialInputs.FOLDER) {
      const newData = getDataFromSchema(rawInput.schema, newPath, mappedPaths, folders)
      Object.assign(data, newData)

      // Sets folder preferences if it wasn't set before
      if (!(newPath in folders)) folders[newPath] = rawInput.settings as FolderSettings
    } else if (key in mappedPaths) {
      // if a key already exists, prompt an error.
      warn(LevaErrors.DUPLICATE_KEYS, key, newPath, mappedPaths[key].path)
    } else {
      const normalizedInput = normalizeInput(rawInput, key, newPath, data)
      if (normalizedInput) {
        const { type, options, input } = normalizedInput
        // @ts-ignore
        const { onChange, transient, onEditStart, onEditEnd, ..._options } = options
        data[newPath] = { type, ..._options, ...input, fromPanel: true }
        mappedPaths[key] = { path: newPath, onChange, transient, onEditStart, onEditEnd }
      } else {
        warn(LevaErrors.UNKNOWN_INPUT, newPath, rawInput)
      }
    }
  })

  return data
}
