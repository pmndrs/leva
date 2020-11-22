import { useMemo, useRef } from 'react'
import { dequal } from 'dequal'

function useDeepCompareMemoize(value: any) {
  const ref = useRef()

  if (!dequal(value, ref.current)) {
    ref.current = value
  }

  return ref.current
}

export function useDeepMemo<T>(fn: () => T, deps: React.DependencyList | undefined) {
  // eslint-disable-next-line react-hooks/exhaustive-deps
  return useMemo(fn, useDeepCompareMemoize(deps))
}
