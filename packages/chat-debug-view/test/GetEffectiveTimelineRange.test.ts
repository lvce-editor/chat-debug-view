import { expect, test } from '@jest/globals'
import { getEffectiveTimelineRange } from '../src/parts/GetEffectiveTimelineRange/GetEffectiveTimelineRange.ts'

test('getEffectiveTimelineRange should return the full timeline range when selection is inactive', () => {
  expect(getEffectiveTimelineRange('1', '5', false, '2', '4')).toEqual({
    endSeconds: '5',
    startSeconds: '1',
  })
})

test('getEffectiveTimelineRange should return the selection range when selection is active', () => {
  expect(getEffectiveTimelineRange('1', '5', true, '2', '4')).toEqual({
    endSeconds: '4',
    startSeconds: '2',
  })
})
