import { useEffect, useMemo, useRef } from 'react'
import { store, getDataFromSchema, useValuesForPath } from './store'
import { folder } from './helpers/folder'
import { ValueInput } from './types'

// TODO fix name type
// @ts-expect-error
export function useTwix(nameOrInput: string | ValueInput, ...args) {
  const _name = typeof nameOrInput === 'string' ? nameOrInput : undefined
  const schema = useRef(_name ? folder(_name, args) : [nameOrInput, ...args])
  const initialData = useMemo(() => getDataFromSchema(schema.current), [])
  const paths = useMemo(() => Object.keys(initialData), [initialData])
  const values = useValuesForPath(paths, initialData)

  useEffect(() => {
    store.setData(initialData)
    return () => store.disposePaths(paths)
  }, [paths, initialData])

  return values
}
