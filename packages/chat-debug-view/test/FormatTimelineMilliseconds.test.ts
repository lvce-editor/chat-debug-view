import { expect, test } from '@jest/globals'
import { formatTimelineMilliseconds } from '../src/parts/FormatTimelineMilliseconds/FormatTimelineMilliseconds.ts'

test('formatTimelineMilliseconds should format whole seconds as milliseconds', () => {
  expect(formatTimelineMilliseconds(20)).toBe('20000ms')
})

test('formatTimelineMilliseconds should format fractional seconds as milliseconds', () => {
  expect(formatTimelineMilliseconds(8.8)).toBe('8800ms')
})

test('formatTimelineMilliseconds should format zero as milliseconds', () => {
  expect(formatTimelineMilliseconds(0)).toBe('0ms')
})