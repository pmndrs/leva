import { useEffect, useMemo, useRef } from 'react'
import { store, getDataFromSchema, useValuesForPath, orderPathFromData } from './store'
import { useRenderRoot } from './components/Leva'
import { folder } from './helpers/folder'
import { register } from './plugin'
import { FolderSettings, Schema, SchemaToValues } from './types/'

import number from './components/Number'
import select from './components/Select'
import color from './components/Color'
import string from './components/String'
import boolean from './components/Boolean'
import point3d from './components/Point3d'
import point2d from './components/Point2d'
import image from './components/Image'
import interval from './components/Interval'

/**
 * Register all the primitive inputs.
 * @note could potentially be done elsewhere.
 */

register('SELECT', select)
register('IMAGE', image)
register('NUMBER', number)
register('COLOR', color)
register('STRING', string)
register('BOOLEAN', boolean)
register('INTERVAL', interval)
register('POINT3D', point3d)
register('POINT2D', point2d)

export function useControls<S extends Schema>(schema: S): SchemaToValues<S>
export function useControls<S extends Schema>(
  name: string,
  schema: S,
  settings?: Partial<FolderSettings>
): SchemaToValues<S>

/**
 * Main hook of Leva. Pass an optional name and an input schema.
 *
 * @param nameOrSchema
 * @param schema
 * @param settings
 */
export function useControls<S extends Schema>(
  nameOrSchema: string | S,
  schema?: S,
  settings?: Partial<FolderSettings>
): SchemaToValues<S> {
  // _name and _schema are used to parse arguments
  const _name = typeof nameOrSchema === 'string' ? nameOrSchema : undefined
  const _schema = useRef(_name ? { [_name]: folder(schema!, settings) } : nameOrSchema)

  /**
   * Parses the schema to extract the inputs initial data.
   *
   * This initial data will be used to initialize the store.
   *
   * Note that getDataFromSchema recursively
   * parses the schema inside nested folder.
   */
  const initialData = useMemo(() => getDataFromSchema(_schema.current), [])

  // Extracts the paths from the initialData and ensures order of paths.
  const paths = useMemo(() => orderPathFromData(initialData), [initialData])

  /**
   * Reactive hook returning the values from the store at given paths.
   * Essentially it flattens the keys of a nested structure.
   * For example { "folder.subfolder.valueKey": value } becomes { valueKey: value }
   *
   * initalData is going to be returned on the first render. Subsequent renders
   * will call the store data.
   * */
  const values = useValuesForPath(paths, initialData)

  useEffect(() => {
    // We initialize the store with the initialData in useEffect.
    // Note that doing this while rendering would makes things easier
    // and remove the need for initializing useValuesForPath but it
    // breaks the rendering cycle for some reason.

    // Old comment that I left, I have no idea what I meant 🤷‍♂️:
    // > we need to compute these in useEffect for monitors to work
    // > but this breaks the order of keys
    store.setData(initialData)
    return () => store.disposePaths(paths)
  }, [paths, initialData])

  // Renders <Leva /> only if it's not manually rendered by the user
  useRenderRoot()

  return values as any
}
