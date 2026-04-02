import { expect, test } from '@jest/globals'
import { formatPercent } from '../src/parts/FormatPercent/FormatPercent.ts'

test('formatPercent should keep whole percentages without decimals', () => {
  expect(formatPercent(20)).toBe('20%')
})

test('formatPercent should round percentages to three decimal places', () => {
  expect(formatPercent(12.345_67)).toBe('12.346%')
})

test('formatPercent should omit trailing zeroes after rounding', () => {
  expect(formatPercent(10.5)).toBe('10.5%')
})
