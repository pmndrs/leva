import type { ColorObjectInput, InputWithSettings, LevaInputProps } from '../../types'

export type Format = 'hex' | 'rgb'

export type Color = string | ColorObjectInput
export type InternalColorSettings = { format: Format; hasAlpha: boolean }

export type ColorInput = InputWithSettings<Color>

export type ColorProps = LevaInputProps<Color, InternalColorSettings, string>
