import { createContext } from 'react'
import { ITokensDefinition } from '@stitches/core'

export const InputContext = createContext({})
export const ThemeContext = createContext<NonNullable<ITokensDefinition>>({})
