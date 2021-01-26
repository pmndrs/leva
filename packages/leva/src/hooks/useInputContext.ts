import { useContext } from 'react'
import { InputContext } from '../context'

export function useInputContext<T>() {
  return useContext(InputContext) as T
}
