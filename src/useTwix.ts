import { useEffect, useMemo, useRef } from 'react'
import { store, useValuesForPath } from './store'
import { folder } from './helpers/folder'

// TODO fix name type
// @ts-expect-error
export function useTwix(nameOrInput: string, ...args) {
  const _name = typeof nameOrInput === 'string' ? nameOrInput : undefined
  const schema = useRef(_name ? folder(_name, args) : [nameOrInput, ...args])
  const [data, paths] = useMemo(() => store.getDataFromSchema(_name, schema.current), [_name])

  const values = useValuesForPath(paths)

  useEffect(() => {
    store.setData(data)
    return () => store.disposePaths(paths)
  }, [paths, data])

  return values
}
