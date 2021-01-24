import { useEffect, useMemo, useRef } from 'react'
import { store, getPaths, getDataFromSchema, useValuesForPath } from './store'
import { useRenderRoot } from './Leva'
import { folder } from './helpers/folder'
import { register } from './plugins'
import { FolderSettings } from './types/'

import number from './components/Number'
import select from './components/Select'
import color from './components/Color'
import string from './components/String'
import boolean from './components/Boolean'
import Point3d from './components/Point/Point3d'
import Point2d from './components/Point/Point2d'
import spring from './components/Spring'
import image from './components/Image'
import interval from './components/Interval'
import { Schema, SchemaToValues } from './types/public-api-types'

register('SELECT', select)
register('IMAGE', image)
register('NUMBER', number)
register('COLOR', color)
register('STRING', string)
register('BOOLEAN', boolean)
register('INTERVAL', interval)
register('POINT3D', Point3d)
register('POINT2D', Point2d)
register('SPRING', spring)

export function useControls<S extends Schema>(schema: S): SchemaToValues<S>
export function useControls<S extends Schema>(
  name: string,
  schema: S,
  settings?: Partial<FolderSettings>
): SchemaToValues<S>
export function useControls<S extends Schema>(
  nameOrSchema: string | S,
  schema?: S,
  settings?: Partial<FolderSettings>
): SchemaToValues<S> {
  const _name = typeof nameOrSchema === 'string' ? nameOrSchema : undefined
  const _schema = useRef(_name ? { [_name]: folder(schema!, settings) } : nameOrSchema)
  const initialData = useMemo(() => getDataFromSchema(_schema.current), [])
  const paths = useMemo(() => getPaths(initialData), [initialData])
  const values = useValuesForPath(paths, initialData)

  useEffect(() => {
    // we need to compute these in useEffect for monitors to work
    // but this breaks the order of keys
    store.setData(initialData)
    return () => store.disposePaths(paths)
  }, [paths, initialData])

  // renders <Leva /> only if it's not manually rendered by the user
  useRenderRoot()

  return values as any
}
