import { expect, test } from '@jest/globals'
import { formatBytes } from '../src/parts/FormatBytes/FormatBytes.ts'

test('formatBytes should format zero bytes', () => {
  expect(formatBytes(0)).toBe('0 B')
})

test('formatBytes should format bytes below one kilobyte', () => {
  expect(formatBytes(512)).toBe('512 B')
})

test('formatBytes should format kilobytes with one decimal place for small values', () => {
  expect(formatBytes(1536)).toBe('1.5 kB')
})

test('formatBytes should format megabytes', () => {
  expect(formatBytes(12 * 1024 * 1024)).toBe('12 MB')
})

test('formatBytes should format petabytes', () => {
  expect(formatBytes(3 * 1024 ** 5)).toBe('3.0 PB')
})
