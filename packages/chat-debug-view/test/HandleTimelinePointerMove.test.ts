import { expect, test } from '@jest/globals'
import * as HandleTimelinePointerMove from '../src/parts/HandleTimelinePointerMove/HandleTimelinePointerMove.ts'
import { createDefaultState } from '../src/parts/State/CreateDefaultState.ts'

test('handleTimelinePointerMove should update the drag preview range', () => {
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
    timelineSelectionAnchorSeconds: '2.5',
    timelineSelectionFocusSeconds: '2.5',
    timelineSelectionLeft: 100,
    timelineSelectionWidth: 400,
  }

  const result = HandleTimelinePointerMove.handleTimelinePointerMove(state, 420)

  expect(result.timelineSelectionFocusSeconds).toBe('8')
})