import { expect, test } from '@jest/globals'
import { handleTimelineStartSeconds } from '../src/parts/HandleTimelineStartSeconds/HandleTimelineStartSeconds.ts'
import { createDefaultState } from '../src/parts/State/CreateDefaultState.ts'

test('handleTimelineStartSeconds should update timeline start seconds', () => {
  const state = createDefaultState()
  const result = handleTimelineStartSeconds(state, '5')
  expect(result.timelineStartSeconds).toBe('5')
})
