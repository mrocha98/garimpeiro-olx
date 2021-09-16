import formatDate from 'date-fns/format'

const dateString = 'dd/MM/yyyy'
const hourString = 'HH:mm'

export const formattedDate = (date: Date) => formatDate(date, dateString)

export const formattedHour = (date: Date) => formatDate(date, hourString)

export const formattedFullDate = (date: Date, separator = '-') =>
  formatDate(date, `${dateString} ${separator} ${hourString}`)
