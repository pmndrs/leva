import React, { createContext, useContext } from 'react'

import type { FullTheme } from './styles'
import type { PanelSettingsType, InputContextProps, LevaStore } from './types'

export const InputContext = createContext({})

export function useInputContext<T = {}>() {
  return useContext(InputContext) as InputContextProps & T
}

type ThemeContextProps = { theme: FullTheme; className: string }

export const ThemeContext = createContext<ThemeContextProps | null>(null)

export const StoreContext = createContext<LevaStore | null>(null)

export const PanelSettingsContext = createContext<PanelSettingsType | null>(null)

export function useStoreContext() {
  return useContext(StoreContext)!
}

export function usePanelSettingsContext() {
  return useContext(PanelSettingsContext)!
}

type LevaStoreProviderProps = {
  children: React.ReactNode
  store: LevaStore
}

export function LevaStoreProvider({ children, store }: LevaStoreProviderProps) {
  return <StoreContext.Provider value={store}>{children}</StoreContext.Provider>
}
