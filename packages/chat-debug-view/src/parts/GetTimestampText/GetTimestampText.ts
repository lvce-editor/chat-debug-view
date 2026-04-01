import { formatTimestamp } from '../FormatTimestamp/FormatTimestamp.ts'

export const getTimestampText = (value: unknown): string => {
  if (typeof value === 'string') {
    const timestamp = Date.parse(value)
    if (!Number.isNaN(timestamp)) {
      return formatTimestamp(new Date(timestamp))
    }
    return value
  }
  if (typeof value === 'number' && Number.isFinite(value)) {
    return formatTimestamp(new Date(value))
  }
  return '-'
}
