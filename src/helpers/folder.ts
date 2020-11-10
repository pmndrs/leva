import { prefix, join, FOLDER_SETTINGS_KEY } from '../utils'
import { FolderSettings } from '../types'

const getDefaultSettings = (settings: FolderSettings) => ({ collapsed: false, ...settings })

// @ts-expect-error
export function folder(nameOrSettings: string | FolderSettings, ...schemas) {
  const _settings = getDefaultSettings(typeof nameOrSettings === 'string' ? { name: nameOrSettings } : nameOrSettings)
  const { name, ...settings } = _settings

  return schemas
    .flat() // flattens schema
    .map(schema => prefix(schema, name)) // prefix all keys
    .concat({ [join(name, FOLDER_SETTINGS_KEY)]: settings }) // concat special settings object
}
