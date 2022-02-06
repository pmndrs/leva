import type { InputWithSettings, LevaInputProps } from '../../types'

export type StringSettings = { textarea?: boolean; editable?: boolean; rows?: number }
export type InternalStringSettings = { asType: 'input' | 'textarea'; editable: boolean; rows: number }
export type StringInput = InputWithSettings<string, StringSettings>
export type StringProps = LevaInputProps<string, InternalStringSettings>
