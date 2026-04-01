import { expect, test } from '@jest/globals'
import * as HandleTimelinePointerUp from '../src/parts/HandleTimelinePointerUp/HandleTimelinePointerUp.ts'
import { createDefaultState } from '../src/parts/State/CreateDefaultState.ts'

test('handleTimelinePointerUp should commit the normalized drag range', () => {
  const state = {
    ...createDefaultState(),
    events: [
      {
        sessionId: 'session-1',
        timestamp: '2026-03-08T00:00:00.000Z',
        type: 'request',
      },
      {
        sessionId: 'session-1',
        timestamp: '2026-03-08T00:00:10.000Z',
        type: 'response',
      },
    ],
    timelineSelectionActive: true,
    timelineSelectionAnchorSeconds: '8',
    timelineSelectionFocusSeconds: '8',
    timelineSelectionLeft: 100,
    timelineSelectionWidth: 400,
  }

  const result = HandleTimelinePointerUp.handleTimelinePointerUp(state, 180)

  expect(result.timelineStartSeconds).toBe('2')
  expect(result.timelineEndSeconds).toBe('8')
  expect(result.timelineSelectionActive).toBe(false)
  expect(result.timelineSelectionAnchorSeconds).toBe('')
  expect(result.timelineSelectionFocusSeconds).toBe('')
})