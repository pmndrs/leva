import { useContext } from 'react'
import { theme, getDefaultTheme, FullTheme } from './stitches.config'

import { ThemeContext } from '../context'
import { warn, LevaErrors } from '../utils'

export function mergeTheme(newTheme: Partial<{}>) {
  const defaultTheme = getDefaultTheme()
  Object.keys(newTheme!).forEach((key) => {
    // @ts-ignore
    Object.assign(defaultTheme![key], newTheme![key])
  })
  return { theme: defaultTheme, className: theme(newTheme).className }
}

export function useTh<C extends keyof FullTheme>(category: C, key: keyof FullTheme[C]) {
  const { theme } = useContext(ThemeContext)!
  if (!(category in theme!) || !(key in theme![category]!)) {
    warn(LevaErrors.THEME_ERROR, category, key)
    return ''
  }
  return theme[category][key]
}

export * from './theme'
export * from './stitches.config'
