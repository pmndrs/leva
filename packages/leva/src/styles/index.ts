import { useContext } from 'react'
import { theme, getDefaultTheme, FullTheme, LevaCustomTheme } from './stitches.config'
import { ThemeContext } from '../context'
import { warn, LevaErrors } from '../utils'

export function mergeTheme(newTheme?: LevaCustomTheme) {
  const defaultTheme = getDefaultTheme()
  if (!newTheme) return { theme: defaultTheme, className: '' }
  Object.keys(newTheme!).forEach((key) => {
    // @ts-ignore
    Object.assign(defaultTheme![key], newTheme![key])
  })
  const className = theme(newTheme).className
  return { theme: defaultTheme, className }
}

export function useTh<C extends keyof FullTheme>(category: C, key: keyof FullTheme[C]) {
  const { theme } = useContext(ThemeContext)!
  if (!(category in theme!) || !(key in theme![category]!)) {
    warn(LevaErrors.THEME_ERROR, category, key)
    return ''
  }
  return theme[category][key]
}

export * from './stitches.config'
