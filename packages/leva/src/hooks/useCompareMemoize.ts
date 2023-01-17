import { useRef } from 'react'
import { dequal } from 'dequal/lite'
import { shallow } from 'zustand/shallow'

export function useCompareMemoize<T>(value: T, deep?: boolean) {
  const ref = useRef<T>()
  const compare = deep ? dequal : shallow

  if (!compare(value, ref.current)) {
    ref.current = value
  }

  return ref.current
}
