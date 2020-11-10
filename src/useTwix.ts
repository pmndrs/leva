import { useEffect, useMemo, useRef } from 'react'
import { prefix, join, FOLDER_SETTINGS_KEY } from './utils'
import { store, useValuesForPath } from './store'
import { FolderSettings } from './types'

const getDefaultSettings = (settings: FolderSettings) => ({ collapsed: false, ...settings })

// @ts-expect-error
export const folder = (nameOrSettings: string | FolderSettings, ...schemas) => {
  const _settings = getDefaultSettings(typeof nameOrSettings === 'string' ? { name: nameOrSettings } : nameOrSettings)
  const { name, ...settings } = _settings

  return schemas
    .flat() // flattens schema
    .map(schema => prefix(schema, name)) // prefix all keys
    .concat({ [join(name, FOLDER_SETTINGS_KEY)]: settings }) // concat special settings object
}

// TODO fix name type
// @ts-expect-error
export function useTwix(nameOrInput: string, ...args) {
  const _name = typeof nameOrInput === 'string' ? nameOrInput : undefined
  const schema = useRef(_name ? folder(_name, args) : [nameOrInput, ...args])
  const [data, paths, folders] = useMemo(() => store.getDataFromSchema(_name, schema.current), [_name])

  const values = useValuesForPath(paths)

  useEffect(() => {
    store.setData(data)
    store.setFolders(folders)
    return () => store.disposePaths(paths)
  }, [paths, data, folders])

  return values
}
