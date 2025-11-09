import type { LevaInputProps } from '../../types'
import type { SelectOptionsType } from './select-plugin'

export type SelectSettings = { options: SelectOptionsType }
export type InternalSelectSettings = { keys: string[]; values: any[] }

export type SelectInput<P = unknown> = { value?: P } & SelectSettings

export type SelectProps = LevaInputProps<any, InternalSelectSettings, number>
