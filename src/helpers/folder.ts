import { FolderSettings, SpecialInputTypes } from '../types'

// @ts-expect-error
export function folder(schema, settings?: FolderSettings) {
  return { type: SpecialInputTypes.FOLDER, schema, settings }
}
