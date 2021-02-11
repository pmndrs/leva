import { useRef } from 'react'
import { dequal } from 'dequal/lite'

export function useDeepCompareMemoize(value: any) {
  const ref = useRef()

  if (!dequal(value, ref.current)) {
    ref.current = value
  }

  return ref.current
}
