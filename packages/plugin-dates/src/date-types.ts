import type { LevaInputProps } from 'leva/plugin'
import { ChangeEventHandler, MouseEventHandler } from 'react'
import { CalendarContainer } from 'react-datepicker'

export type DateSettings = { locale: string; inputFormat: string }
export type DateInput = { date: Date } & Partial<DateSettings>

// TODO: export this upstream
export type DateCalendarContainerProps = React.ComponentProps<typeof CalendarContainer>
export type DateInputProps = { value: string; onClick: MouseEventHandler; onChange: ChangeEventHandler }

export type InternalDate = { date: Date; formattedDate: string }

export type InternalDateSettings = Required<DateSettings>

export type DateProps = LevaInputProps<InternalDate, InternalDateSettings, string>
