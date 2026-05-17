import { expect, test } from '@jest/globals'
import { formatTableSummaryDuration } from '../src/parts/FormatTableSummaryDuration/FormatTableSummaryDuration.ts'

test('formatTableSummaryDuration should format sub-second durations as milliseconds', () => {
  expect(formatTableSummaryDuration(250)).toBe('250ms')
})

test('formatTableSummaryDuration should format second durations as seconds', () => {
  expect(formatTableSummaryDuration(2500)).toBe('2.5s')
})

test('formatTableSummaryDuration should format the one second threshold as seconds', () => {
  expect(formatTableSummaryDuration(1000)).toBe('1s')
})
