import { isRecord } from '../IsRecord/IsRecord.ts'
import { toSingleQuotedString } from '../ToSingleQuotedString/ToSingleQuotedString.ts'

export const getHeaderLines = (value: unknown): readonly string[] => {
  if (!isRecord(value)) {
    return []
  }
  const lines: string[] = []
  for (const [key, headerValue] of Object.entries(value)) {
    if (typeof headerValue === 'string' || typeof headerValue === 'number' || typeof headerValue === 'boolean') {
      lines.push(`    ${toSingleQuotedString(key)}: ${toSingleQuotedString(String(headerValue))},`)
    }
  }
  if (lines.length === 0) {
    return []
  }
  return ['  headers: {', ...lines, '  },']
}
