import { useMemo } from 'react'
import { useCompareMemoize } from './useCompareMemoize'

export function useShallowMemo<T>(fn: () => T, deps: React.DependencyList | undefined) {
  // NOTE: useMemo implementation allows undefined, but types do not
  // eslint-disable-next-line react-hooks/exhaustive-deps
  return useMemo(fn, useCompareMemoize(deps, false) ?? [])
}
