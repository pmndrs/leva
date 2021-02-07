import { useRef } from 'react'
import shallow from 'zustand/shallow'

export function useDeepCompareMemoize(value: any) {
  const ref = useRef()

  if (!shallow(value, ref.current)) {
    ref.current = value
  }

  return ref.current
}
