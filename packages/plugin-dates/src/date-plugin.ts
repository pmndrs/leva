import type { DateInput, DateSettings, InternalDate, InternalDateSettings } from './date-types'
import { formatDate } from './date-utils'

const defaultSettings = {
  inputFormat: 'MM/dd/yyyy',
}

export const sanitize = (value: Date, settings: DateSettings) => {
  return {
    date: value,
    formattedDate: formatDate(value, settings.locale),
  }
}

export const format = (value: InternalDate, settings: DateSettings) => {
  return {
    date: value.date,
    formattedDate: formatDate(value.date, settings.locale),
  }
}

export const normalize = ({ date, ..._settings }: DateInput) => {
  const settings = { ...defaultSettings, ..._settings }
  const defaultDate = date ?? new Date()
  return {
    value: { date: defaultDate, formattedDate: formatDate(defaultDate, settings.locale) },
    settings: settings as InternalDateSettings,
  }
}
