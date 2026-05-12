import { expect, test } from '@jest/globals'
import { formatHttpStatusCode } from '../src/parts/FormatHttpStatusCode/FormatHttpStatusCode.ts'

test('formatHttpStatusCode should append standard reason phrase for 200', () => {
  const result = formatHttpStatusCode(200)

  expect(result).toBe('200 OK')
})

test('formatHttpStatusCode should append standard reason phrase for 304', () => {
  const result = formatHttpStatusCode('304')

  expect(result).toBe('304 Not Modified')
})

test('formatHttpStatusCode should preserve unknown numeric status codes', () => {
  const result = formatHttpStatusCode(599)

  expect(result).toBe('599')
})

test('formatHttpStatusCode should preserve non-numeric values', () => {
  const result = formatHttpStatusCode('pending')

  expect(result).toBe('pending')
})
