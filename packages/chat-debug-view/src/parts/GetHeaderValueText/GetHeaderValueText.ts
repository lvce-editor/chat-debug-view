import { stringifyHeaderValue } from '../StringifyHeaderValue/StringifyHeaderValue.ts'

export const getHeaderValueText = (value: unknown): string => {
  if (typeof value === 'string') {
    return value
  }
  if (value === undefined) {
    return ''
  }
  if (typeof value === 'number' || typeof value === 'boolean' || typeof value === 'bigint') {
    return String(value)
  }
  if (value === null) {
    return 'null'
  }
  if (typeof value === 'symbol') {
    return value.description ? `Symbol(${value.description})` : 'Symbol()'
  }
  if (typeof value === 'function') {
    return '[function]'
  }
  return stringifyHeaderValue(value)
}
