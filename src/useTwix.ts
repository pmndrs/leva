import { useEffect, useMemo, useRef } from 'react'
import { prefix, join, FOLDER_SETTINGS_KEY } from './utils'
import { store, useValuesForPath } from './store'
import { SettingsFolder } from './types'

// @ts-expect-error
export const folder = (nameOrSettings: string | SettingsFolder, ...schemas) => {
  const _name = typeof nameOrSettings === 'string' ? nameOrSettings : nameOrSettings.name
  const folderSchemas = schemas.flat(10).map(schema => prefix(schema, _name))
  if (typeof nameOrSettings === 'string') return folderSchemas
  const { name, ..._settings } = nameOrSettings
  return folderSchemas.concat({ [join(_name, FOLDER_SETTINGS_KEY)]: _settings })
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
