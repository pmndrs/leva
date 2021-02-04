import { createContext, useContext } from 'react'
import { ITokensDefinition } from '@stitches/core'

export const InputContext = createContext({})
export const ThemeContext = createContext<NonNullable<ITokensDefinition>>({})
export const WrapperSetOverflowContext = createContext<((flag: boolean) => void) | null>(null)

export const useSetWrapperOverFlow = () => {
  return useContext(WrapperSetOverflowContext)!
}
