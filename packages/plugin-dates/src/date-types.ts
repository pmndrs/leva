import { ChangeEventHandler, MouseEventHandler } from 'react'
import { CalendarContainerProps } from 'react-datepicker'

import type { LevaInputProps } from 'leva/plugin'

export type DateSettings = { locale: string; inputFormat: string }
export type DateInput = { date: Date } & Partial<DateSettings>

export type DateCalendarContainerProps = CalendarContainerProps
export type DateInputProps = { value: string; onClick: MouseEventHandler; onChange: ChangeEventHandler }

export type InternalDate = { date: Date; formattedDate: string }

export type InternalDateSettings = Required<DateSettings>

export type DateProps = LevaInputProps<InternalDate, InternalDateSettings, string>
