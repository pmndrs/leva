import { useShallow } from 'zustand/shallow'
import { useStoreContext } from '../context'
import type { State } from '../types'

export const useValue = (path: string) => {
  return useValues([path])[path]
}

export const useValues = <T extends string>(paths: T[]) => {
  const store = useStoreContext()
  const value = store.useStore(
    useShallow((state: State) =>
      paths.reduce((acc, path) => {
        if (state.data[path] && 'value' in state.data[path])
          return Object.assign(acc, { [path]: state.data[path].value })
        return acc
      }, {} as { [key in T]: any })
    )
  )
  return value
}
