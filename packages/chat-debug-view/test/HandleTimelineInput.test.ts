import { expect, test } from '@jest/globals'
import * as HandleTimelineInput from '../src/parts/HandleTimelineInput/HandleTimelineInput.ts'
import { createDefaultState } from '../src/parts/State/CreateDefaultState.ts'

test('handleTimelineStartSeconds should update timeline start seconds', () => {
  const state = createDefaultState()
  const result = HandleTimelineInput.handleTimelineStartSeconds(state, '5')
  expect(result.timelineStartSeconds).toBe('5')
})

test('handleTimelineEndSeconds should update timeline end seconds', () => {
  const state = createDefaultState()
  const result = HandleTimelineInput.handleTimelineEndSeconds(state, '7')
  expect(result.timelineEndSeconds).toBe('7')
})

test('handleTimelineRangePreset should clear timeline range', () => {
  const state = {
    ...createDefaultState(),
    timelineEndSeconds: '7',
    timelineStartSeconds: '5',
  }
  const result = HandleTimelineInput.handleTimelineRangePreset(state, '')
  expect(result.timelineStartSeconds).toBe('')
  expect(result.timelineEndSeconds).toBe('')
})

test('handleTimelineRangePreset should set timeline range from preset', () => {
  const state = createDefaultState()
  const result = HandleTimelineInput.handleTimelineRangePreset(state, '5:7')
  expect(result.timelineStartSeconds).toBe('5')
  expect(result.timelineEndSeconds).toBe('7')
})
