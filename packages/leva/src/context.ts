import { createContext, useContext } from 'react'
import { ITokensDefinition } from '@stitches/core'
import { StoreType } from './store'

export const InputContext = createContext({})

export function useInputContext<T>() {
  return useContext(InputContext) as T
}

export const ThemeContext = createContext<NonNullable<ITokensDefinition>>({})

export const StoreContext = createContext<StoreType | null>(null)

export function useStoreContext() {
  return useContext(StoreContext)!
}
