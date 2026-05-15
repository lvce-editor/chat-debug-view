import { escapeSingleQuotedString } from '../EscapeSingleQuotedString/EscapeSingleQuotedString.ts'

export const toSingleQuotedString = (value: string): string => {
  return `'${escapeSingleQuotedString(value)}'`
}
