import { useEffect, useMemo, useRef } from 'react'
import { store, getDataFromSchema, useValuesForPath } from './store'
import { useRenderRoot } from './components/Twix'
import { folder } from './helpers/folder'
import { register } from './register'

import number from './components/Number'
import select from './components/Select'
import color from './components/Color'
import string from './components/String'
import boolean from './components/Boolean'
import point3d from './components/Point/Point3d'
import point2d from './components/Point/Point2d'
import spring from './components/Spring'
import image from './components/Image'
import interval from './components/Interval'

register(select, 'SELECT')
register(image, 'IMAGE')
register(number, 'NUMBER')
register(color, 'COLOR')
register(string, 'STRING')
register(boolean, 'BOOLEAN')
register(interval, 'INTERVAL')
register(point3d, 'POINT3D')
register(point2d, 'POINT2D')
register(spring, 'SPRING')

// FIXME fix name type in useTwix
// @ts-expect-error
export function useTwix(nameOrSchema: string | any, schema?) {
  const _name = typeof nameOrSchema === 'string' ? nameOrSchema : undefined
  const _schema = useRef(_name ? { [_name]: folder(schema) } : nameOrSchema)
  const initialData = useMemo(() => getDataFromSchema(_schema.current), [])
  const paths = useMemo(() => Object.keys(initialData), [initialData])
  const values = useValuesForPath(paths, initialData)

  useEffect(() => {
    store.setData(initialData)
    return () => store.disposePaths(paths)
  }, [paths, initialData])

  useRenderRoot()

  return values
}
