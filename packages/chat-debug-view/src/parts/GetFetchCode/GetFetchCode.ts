import type { ChatViewEvent } from '../ChatViewEvent/ChatViewEvent.ts'
import { getBodyLine } from '../GetBodyLine/GetBodyLine.ts'
import { getHeaderLines } from '../GetHeaderLines/GetHeaderLines.ts'
import { toSingleQuotedString } from '../ToSingleQuotedString/ToSingleQuotedString.ts'

export const getFetchCode = (event: ChatViewEvent): string | undefined => {
  if (typeof event.url !== 'string') {
    return undefined
  }
  const lines: string[] = []
  if (typeof event.method === 'string' && event.method !== 'GET') {
    lines.push(`  method: ${toSingleQuotedString(event.method)},`)
  }
  lines.push(...getHeaderLines(event.headers))
  if (event.body !== undefined) {
    lines.push(getBodyLine(event.body))
  }
  if (lines.length === 0) {
    return `fetch(${toSingleQuotedString(event.url)})`
  }
  return `fetch(${toSingleQuotedString(event.url)}, {\n${lines.join('\n')}\n})`
}
