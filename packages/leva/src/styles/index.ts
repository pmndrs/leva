import { useContext } from 'react'
import { ITokensDefinition } from '@stitches/core'
import { css, getDefaultTheme } from './stitches.config'

import { ThemeContext } from '../context'
import { warn, LevaErrors } from '../utils'

export function mergeTheme(newTheme: Partial<{}>) {
  const theme = getDefaultTheme()
  Object.keys(newTheme!).forEach((key) => {
    // @ts-ignore
    Object.assign(theme![key], newTheme![key])
  })
  return { theme, className: css.theme(newTheme) }
}

export function useTh(category: keyof ITokensDefinition, key: string) {
  const { theme } = useContext(ThemeContext)!
  if (!(category in theme!) || !(key in theme![category]!)) {
    warn(LevaErrors.THEME_ERROR, category, key)
    return ''
  }
  return theme[category]![key]
}

export * from './theme'
export * from './stitches.config'
