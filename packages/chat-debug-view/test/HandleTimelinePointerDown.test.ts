import { expect, test } from '@jest/globals'
import * as HandleTimelinePointerDown from '../src/parts/HandleTimelinePointerDown/HandleTimelinePointerDown.ts'
import { createDefaultState } from '../src/parts/State/CreateDefaultState.ts'

test('handleTimelinePointerDown should start a drag selection from the pointer position', () => {
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
  }

  const result = HandleTimelinePointerDown.handleTimelinePointerDown(state, 250, 100, 400)

  expect(result.timelineSelectionActive).toBe(true)
  expect(result.timelineSelectionAnchorSeconds).toBe('3.75')
  expect(result.timelineSelectionFocusSeconds).toBe('3.75')
  expect(result.timelineSelectionLeft).toBe(100)
  expect(result.timelineSelectionWidth).toBe(400)
})