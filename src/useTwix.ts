import { useEffect, useMemo, useRef } from 'react'
import { prefix } from './utils'
import { store, useValuesForPath } from './store'

// @ts-expect-error
export const folder = (name: string, ...schemas) => {
  return schemas.flat(10).map(schema => prefix(schema, name))
}

// @ts-expect-error
export function useTwix(name: string, ...args) {
  const _name = typeof name === 'string' ? name : undefined
  const schema = useRef(typeof name === 'string' ? args : [name, ...args])
  const [data, paths] = useMemo(() => store.getDataFromSchema(_name, schema.current), [_name])

  const values = useValuesForPath(paths)

  useEffect(() => {
    store.setData(data)
    return () => store.disposePaths(paths)
  }, [paths, data])

  return values
}
