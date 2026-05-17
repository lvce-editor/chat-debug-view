import { expect, test } from '@jest/globals'
import { handleTimelineEndSeconds } from '../src/parts/HandleTimelineEndSeconds/HandleTimelineEndSeconds.ts'
import { createDefaultState } from '../src/parts/State/CreateDefaultState.ts'

test('handleTimelineEndSeconds should update timeline end seconds', () => {
  const state = createDefaultState()
  const result = handleTimelineEndSeconds(state, '7')
  expect(result.timelineEndSeconds).toBe('7')
})
