let timestampFormatter: Intl.DateTimeFormat | undefined

const getTimestampFormatter = (): Intl.DateTimeFormat => {
  if (!timestampFormatter) {
    timestampFormatter = new Intl.DateTimeFormat('en-US', {
      day: '2-digit',
      fractionalSecondDigits: 3,
      hour: '2-digit',
      hourCycle: 'h23',
      minute: '2-digit',
      month: 'short',
      second: '2-digit',
      timeZone: 'UTC',
      year: 'numeric',
    })
  }

  return timestampFormatter
}

export const formatTimestamp = (date: Readonly<Date>): string => {
  return `${getTimestampFormatter().format(date)} UTC`
}
