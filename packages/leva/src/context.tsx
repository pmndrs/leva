import React, { createContext, useContext } from 'react'
import { StoreType } from './store'
import { FullTheme } from './styles'

export const InputContext = createContext({})

export function useInputContext<T>() {
  return useContext(InputContext) as T
}

type ThemeContextProps = { theme: FullTheme; className: string }

export const ThemeContext = createContext<ThemeContextProps | null>(null)

export const StoreContext = createContext<StoreType | null>(null)

export function useStoreContext() {
  return useContext(StoreContext)!
}

type StoreProviderProps = {
  children: React.ReactChild | React.ReactChild[] | React.ReactChildren
  store: StoreType
}

export function LevaStoreProvider({ children, store }: StoreProviderProps) {
  return <StoreContext.Provider value={store}>{children}</StoreContext.Provider>
}
