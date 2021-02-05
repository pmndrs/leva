import { createContext, useContext } from 'react'
import { ITokensDefinition } from '@stitches/core'
import { DataItem } from './types'

export const InputContext = createContext({})

export function useInputContext<T>() {
  return useContext(InputContext) as T
}

export const ThemeContext = createContext<NonNullable<ITokensDefinition>>({})

type StoreContextProps = {
  getValue: (path: string) => any
  setValue: (value: any, path: string) => void
  getInput: (path: string) => DataItem
}
export const StoreContext = createContext<StoreContextProps | null>(null)

export function useStoreContext() {
  return useContext(StoreContext)!
}
