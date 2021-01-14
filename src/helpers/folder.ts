import { Schema } from '../public-api-types'
import { FolderSettings, SpecialInputTypes, FolderInput } from '../types'

const defaultSettings = { collapsed: false }

export function folder<S extends Schema>(schema: S, settings?: Partial<FolderSettings>): FolderInput<S> {
  return { type: SpecialInputTypes.FOLDER, schema, settings: { ...defaultSettings, ...settings } }
}
