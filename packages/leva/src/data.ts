import { pick } from './utils'
import { warn, LevaErrors } from './utils/log'

import { Data } from './types'

/**
 * Takes a data object with { [path.key]: value } and returns { [key]: value }.
 * Also warns when two similar keys are being used by the user.
 *
 * @param data
 * @param paths
 * @param shouldWarn
 */
export function getValuesForPaths(data: Data, paths: string[], shouldWarn: boolean) {
  return Object.entries(pick(data, paths) as Data).reduce(
    // Typescript complaints that SpecialInput type doesn't have a value key.
    // But getValuesForPath is only called from paths that are inputs,
    // so they always have a value key.

    // @ts-expect-error
    (acc, [path, { value, key }]) => {
      // if a key already exists in the accumulator, prompt an error.
      if (acc[key] !== undefined) {
        if (shouldWarn) warn(LevaErrors.DUPLICATE_KEYS, key, path)
        return acc
      }
      return { ...acc, [key]: value }
    },
    {} as { [path: string]: any }
  )
}
