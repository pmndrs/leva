import { useRef } from 'react'
import shallow from 'zustand/shallow'

export function useShallow<T, K>(
  newValue: T,
  fn: () => K,
  deps: React.DependencyList | ((prev: T, next: T) => boolean)
) {
  const valueRef = useRef(newValue)
  const depsRef = useRef<React.DependencyList>()
  const o = useRef<K>()

  if (typeof deps === 'function') {
    if (deps(valueRef.current, newValue)) {
      valueRef.current = newValue
      o.current = fn()
    }
  } else if (!shallow(deps, depsRef.current)) {
    depsRef.current = deps
    o.current = fn()
  }

  return o.current
}
