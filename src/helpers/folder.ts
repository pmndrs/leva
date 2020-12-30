import { FolderSettings, Schema, SpecialInputTypes } from '../types'

const defaultSettings = { collapsed: false }

export function folder(schema: Schema, settings?: Partial<FolderSettings>) {
  return { type: SpecialInputTypes.FOLDER, schema, settings: { ...defaultSettings, ...settings } }
}
