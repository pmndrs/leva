import type { LevaInputProps } from '../../types'
import type { z } from 'zod'
import type { selectOptionsSchema } from './select-plugin'

export type SelectSettings = { options: z.infer<typeof selectOptionsSchema> }
export type InternalSelectSettings = { keys: string[]; values: any[] }

export type SelectInput<P = unknown> = { value?: P } & SelectSettings

export type SelectProps = LevaInputProps<any, InternalSelectSettings, number>
