import { prefix, join, FolderSettingsKey } from '../utils'
import { FolderSettings } from '../types'

type UserFolderSettings = string | (FolderSettings & { name: string })

// @ts-expect-error
export function folder(nameOrSettings: UserFolderSettings, ...schemas) {
  const _settings = typeof nameOrSettings === 'string' ? { name: nameOrSettings } : nameOrSettings
  const { name, ...settings } = _settings

  return schemas
    .flat() // flattens schema
    .map(schema => prefix(schema, name)) // prefix all keys
    .concat({ [join(name, FolderSettingsKey)]: settings }) // concat special settings object
}
