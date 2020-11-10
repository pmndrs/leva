import { useEffect, useMemo, useRef } from 'react'
import shallow from 'zustand/shallow'
import { prefix, getValuesForPaths } from './utils'
import { disposePaths, setStoreData, useStore, init } from './store'

// @ts-expect-error
export const folder = (name: string, ...schemas) => {
  return schemas.flat(10).map(schema => prefix(schema, name))
}

// @ts-expect-error
export function useTwix(name: string, ...args) {
  const _name = typeof name === 'string' ? name : undefined
  const schema = useRef(typeof name === 'string' ? args : [name, ...args])
  const [paths, data] = useMemo(() => init(_name, schema.current), [_name])

  useEffect(() => {
    setStoreData(data)
    return () => disposePaths(paths)
  }, [paths, data])

  return useStore(s => getValuesForPaths(s.data, paths), shallow)
}
