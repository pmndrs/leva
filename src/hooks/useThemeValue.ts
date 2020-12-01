import { useRef } from 'react'
import { useTheme } from '@xstyled/styled-components'
import { th } from '@xstyled/system'

export function useThemeValue(type: keyof typeof th, value: string) {
  const theme = useTheme()
  const val = useRef(th[type](value)({ theme }))
  return val.current
}
