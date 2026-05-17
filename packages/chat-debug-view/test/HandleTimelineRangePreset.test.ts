import { expect, test } from '@jest/globals'
import { handleTimelineRangePreset } from '../src/parts/HandleTimelineRangePreset/HandleTimelineRangePreset.ts'
import { createDefaultState } from '../src/parts/State/CreateDefaultState.ts'

test('handleTimelineRangePreset should clear timeline range', () => {
  const state = {
    ...createDefaultState(),
    timelineEndSeconds: '7',
    timelineStartSeconds: '5',
  }
  const result = handleTimelineRangePreset(state, '')
  expect(result.timelineStartSeconds).toBe('')
  expect(result.timelineEndSeconds).toBe('')
})

test('handleTimelineRangePreset should set timeline range from preset', () => {
  const state = createDefaultState()
  const result = handleTimelineRangePreset(state, '5:7')
  expect(result.timelineStartSeconds).toBe('5')
  expect(result.timelineEndSeconds).toBe('7')
})
