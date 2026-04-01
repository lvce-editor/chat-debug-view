import { expect, test } from '@jest/globals'
import * as HandleTimelineDoubleClick from '../src/parts/HandleTimelineDoubleClick/HandleTimelineDoubleClick.ts'
import { createDefaultState } from '../src/parts/State/CreateDefaultState.ts'

test('handleTimelineDoubleClick should clear the current timeline selection', () => {
  const state = {
    ...createDefaultState(),
    timelineEndSeconds: '7',
    timelineSelectionActive: true,
    timelineSelectionAnchorSeconds: '3',
    timelineSelectionFocusSeconds: '7',
    timelineStartSeconds: '3',
  }

  const result = HandleTimelineDoubleClick.handleTimelineDoubleClick(state)

  expect(result.timelineStartSeconds).toBe('')
  expect(result.timelineEndSeconds).toBe('')
  expect(result.timelineSelectionActive).toBe(false)
  expect(result.timelineSelectionAnchorSeconds).toBe('')
  expect(result.timelineSelectionFocusSeconds).toBe('')
})
