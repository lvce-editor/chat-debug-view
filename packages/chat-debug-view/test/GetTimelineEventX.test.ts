import { expect, test } from '@jest/globals'
import { getTimelineEventX } from '../src/parts/GetTimelineEventX/GetTimelineEventX.ts'

test('getTimelineEventX should preserve browser client x values', () => {
  const result = getTimelineEventX(140)

  expect(result).toBe(140)
})

test('getTimelineEventX should preserve smaller positive client x values', () => {
  const result = getTimelineEventX(20)

  expect(result).toBe(20)
})

test('getTimelineEventX should preserve negative client x values', () => {
  const result = getTimelineEventX(-20)

  expect(result).toBe(-20)
})
