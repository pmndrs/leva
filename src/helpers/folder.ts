import { FolderInput, Schema, SchemaToValues } from '../public-api-types'
import { FolderSettings, SpecialInputTypes } from '../types'

const defaultSettings = { collapsed: false }

export function folder<S extends Schema>(
  schema: S,
  settings?: Partial<FolderSettings>
): FolderInput<SchemaToValues<S>> {
  return {
    type: SpecialInputTypes.FOLDER,
    schema,
    settings: { ...defaultSettings, ...settings },
  } as any
}
