import { useMemo } from 'react'
import { useDeepCompareMemoize } from './useDeepCompareMemoize'

export function useDeepMemo<T>(fn: () => T, deps: React.DependencyList | undefined) {
  // eslint-disable-next-line react-hooks/exhaustive-deps
  return useMemo(fn, useDeepCompareMemoize(deps))
}
