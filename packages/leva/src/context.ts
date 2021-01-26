import { createContext, useContext } from 'react'

export const InputContext = createContext({})

export function useInputContext<T>() {
  return useContext(InputContext) as T
}
