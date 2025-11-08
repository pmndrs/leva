import type { LevaInputProps } from '../../types'
import type { SelectOption } from '../../types/public'

export type SelectSettings<U = unknown> = { options: Record<string, U> | U[] | SelectOption<U>[] }
export type InternalSelectSettings = { keys: string[]; values: any[] }

export type SelectInput<P = unknown, U = unknown> = { value?: P } & SelectSettings<U>

export type SelectProps = LevaInputProps<any, InternalSelectSettings, number>
