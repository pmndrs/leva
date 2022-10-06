import type { LevaInputProps } from 'leva/plugin'
import { ChangeEventHandler, MouseEventHandler } from 'react'
import { CalendarContainerProps } from 'react-datepicker'

export type DateSettings = { format: string }
export type DateInput = { date: Date } & DateSettings

export type DateCalendarContainerProps = CalendarContainerProps
export type DateInputProps = { value: string; onClick: MouseEventHandler; onChange: ChangeEventHandler }

export type InternalDate = { date: Date; formattedDate: string }

export type InternalDateSettings = Required<DateSettings>

export type DateProps = LevaInputProps<InternalDate, InternalDateSettings, string>
