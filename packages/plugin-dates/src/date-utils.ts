import format from 'date-fns/format'
import parse from 'date-fns/parse'

export function parseDate(date: string, dateFormat: string) {
  return parse(date, dateFormat, new Date())
}

export function formatDate(date: Date, dateFormat: string) {
  return format(date, dateFormat)
}
