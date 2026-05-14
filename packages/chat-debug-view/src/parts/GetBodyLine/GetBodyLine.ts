import { indent } from '../Indent/Indent.ts'
import { toSingleQuotedString } from '../ToSingleQuotedString/ToSingleQuotedString.ts'

export const getBodyLine = (value: unknown): string => {
  if (typeof value === 'string') {
    return `  body: ${toSingleQuotedString(value)},`
  }
  if (typeof value === 'function' || typeof value === 'symbol' || typeof value === 'bigint') {
    return `  body: ${toSingleQuotedString(String(value))},`
  }
  let serializedBody: string
  try {
    serializedBody = JSON.stringify(value, null, 2)
  } catch {
    return `  body: ${toSingleQuotedString(String(value))},`
  }
  if (!serializedBody) {
    return `  body: ${toSingleQuotedString(String(value))},`
  }
  return `  body: JSON.stringify(\n${indent(serializedBody, 4)}\n  ),`
}
