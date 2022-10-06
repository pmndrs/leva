import type { DateInput, DateSettings, InternalDate, InternalDateSettings } from './date-types'
import { formatDate, parseDate } from './date-utils'

const defaultSettings = { format: 'MM/dd/yyyy' }

export const sanitize = (value: string, settings: DateSettings) => {
  return {
    date: parseDate(value, settings.format),
    formattedDate: value,
  }
}

export const format = (value: InternalDate, settings: DateSettings, ...rest: any) => {
  return {
    date: value.date,
    formattedDate: formatDate(value.date, settings.format),
  }
}

export const normalize = ({ date, ..._settings }: DateInput) => {
  const settings = { ...defaultSettings, ..._settings }
  const defaultDate = date ?? new Date()
  return {
    value: { date: defaultDate, formattedDate: formatDate(defaultDate, settings.format) },
    settings: settings as InternalDateSettings,
  }
}
