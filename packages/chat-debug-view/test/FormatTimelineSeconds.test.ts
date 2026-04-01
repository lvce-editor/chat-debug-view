import { expect, test } from '@jest/globals'
import { formatTimelineSeconds } from '../src/parts/FormatTimelineSeconds/FormatTimelineSeconds.ts'

test('formatTimelineSeconds should return whole seconds without decimals', () => {
  expect(formatTimelineSeconds(5)).toBe('5s')
})

test('formatTimelineSeconds should round fractional seconds to one decimal place', () => {
  expect(formatTimelineSeconds(5.25)).toBe('5.3s')
})

test('formatTimelineSeconds should omit trailing zero after rounding', () => {
  expect(formatTimelineSeconds(5.04)).toBe('5s')
})