import { expect, test } from '@jest/globals'
import { getTimelineBadgeValues } from '../src/parts/GetTimelineBadgeValues/GetTimelineBadgeValues.ts'

test('getTimelineBadgeValues should return only zero for non-positive durations', () => {
  expect(getTimelineBadgeValues(0)).toEqual([0])
  expect(getTimelineBadgeValues(-1)).toEqual([0])
})

test('getTimelineBadgeValues should split sub-second durations into start middle and end badges', () => {
  expect(getTimelineBadgeValues(0.8)).toEqual([0, 0.4, 0.8])
})

test('getTimelineBadgeValues should clamp whole-second durations to at most five segments', () => {
  expect(getTimelineBadgeValues(10)).toEqual([0, 2, 4, 6, 8, 10])
})

test('getTimelineBadgeValues should preserve the original duration for the final badge', () => {
  expect(getTimelineBadgeValues(1.2345)).toEqual([0, 0.617, 1.2345])
})
