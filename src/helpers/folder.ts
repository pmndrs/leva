import { FolderSettings, SpecialInputTypes } from '../types'

const defaultSettings = { collapsed: false }

// @ts-expect-error
export function folder(schema, settings?: Partial<FolderSettings>) {
  return { type: SpecialInputTypes.FOLDER, schema, settings: { ...defaultSettings, ...settings } }
}
