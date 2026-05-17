import { expect, test } from '@jest/globals'
import { parseTimelineRangePreset } from '../src/parts/ParseTimelineRangePreset/ParseTimelineRangePreset.ts'

test('parseTimelineRangePreset should clear timeline range', () => {
  const result = parseTimelineRangePreset('')
  expect(result.timelineStartSeconds).toBe('')
  expect(result.timelineEndSeconds).toBe('')
})

test('parseTimelineRangePreset should set timeline range from preset', () => {
  const result = parseTimelineRangePreset('5:7')
  expect(result.timelineStartSeconds).toBe('5')
  expect(result.timelineEndSeconds).toBe('7')
})
